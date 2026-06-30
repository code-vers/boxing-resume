"use client";

import { useRef, useState, useEffect } from "react";
import { User, Lock, Phone, Camera } from "lucide-react";
import { AuthInput } from "@/features/authentication/components/auth-input.component";
import { useCustomForm } from "@/features/authentication/hooks/useCustomForm";
import {
  updateProfileSchema,
  UpdateProfileFormData,
  changePasswordSchema,
  ChangePasswordFormData
} from "../validation/profile.validation";
import {
  useGetProfile,
  useUpdateProfile,
  useUploadProfileImage,
  useChangePassword
} from "../hooks/useProfile";
import { ApiError } from "@/features/authentication/types/auth.types";
import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";

export function ProfileComponent() {
  const { data: profileResponse, isLoading } = useGetProfile();
  const profile = profileResponse?.data;

  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const { mutate: uploadImage, isPending: isUploadingImage } = useUploadProfileImage();
  const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();

  // We need to update the auth context so the navbar updates immediately
  const { user, login } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form for Profile Update
  const {
    values: profileValues,
    errors: profileErrors,
    touched: profileTouched,
    handleChange: handleProfileChange,
    handleBlur: handleProfileBlur,
    handleSubmit: handleProfileSubmit,
    setValues: setProfileValues,
    setErrors: setProfileErrors,
  } = useCustomForm<UpdateProfileFormData>({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (formValues) => {
      updateProfile(formValues, {
        onSuccess: (data) => {
          // Update global auth state with new name
          if (user && data.data) {
            login({ ...user, name: data.data.name });
          }
        },
        onError: (error) => {
          const apiErr = error as ApiError;
          if (apiErr.fieldErrors) {
            setProfileErrors(apiErr.fieldErrors as Partial<Record<keyof UpdateProfileFormData, string>>);
          }
        },
      });
    },
  });

  // Populate profile form when data loads
  useEffect(() => {
    if (profile) {
      setProfileValues({
        name: profile.name || "",
        phone: profile.phone || "",
      });
      if (profile.image) {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
        setImagePreview(`${serverUrl}${profile.image}`);
      }
    }
  }, [profile, setProfileValues]);

  // Form for Password Change
  const {
    values: pwdValues,
    errors: pwdErrors,
    touched: pwdTouched,
    handleChange: handlePwdChange,
    handleBlur: handlePwdBlur,
    handleSubmit: handlePwdSubmit,
    setErrors: setPwdErrors,
    setValues: setPwdValues,
  } = useCustomForm<ChangePasswordFormData>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (formValues) => {
      changePassword(
        { oldPassword: formValues.oldPassword, newPassword: formValues.newPassword },
        {
          onSuccess: () => {
            // Reset form
            setPwdValues({ oldPassword: "", newPassword: "", confirmPassword: "" });
          },
          onError: (error) => {
            const apiErr = error as ApiError;
            if (apiErr.fieldErrors) {
              setPwdErrors(apiErr.fieldErrors as Partial<Record<keyof ChangePasswordFormData, string>>);
            }
          },
        }
      );
    },
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      uploadImage(file, {
        onSuccess: (data) => {
          if (user && data.data?.image) {
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
            const newAvatar = `${serverUrl}${data.data.image}`;
            login({ ...user, avatar: newAvatar });
          }
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-svh bg-card-dark text-surface-white">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-12 h-12 border-4 border-btn-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-text-placeholder font-medium tracking-wide uppercase text-sm">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <section className='w-full min-h-[800px] bg-card-dark text-surface-white pt-16 md:pt-24 pb-24'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 md:px-8 xl:px-12'>

        {/* Header Title section mimicking HeroBanner styling */}
        <div className='flex flex-col mb-12'>
          <div className='mb-4 flex items-center gap-3'>
            <div className='h-[2px] w-8 bg-text-accent'></div>
            <span className='text-text-accent text-xs font-bold uppercase tracking-[0.2em]'>
              Dashboard
            </span>
          </div>
          <h1 className='text-5xl font-black uppercase leading-[0.95] tracking-tight text-surface-white sm:text-6xl'>
            My <span className='text-text-accent'>Profile.</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10">

          {/* Avatar Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div
              className="relative w-48 h-48 rounded-full bg-[#141414] border border-stroke-strong overflow-hidden cursor-pointer group mb-6 shadow-xl"
              onClick={handleImageClick}
            >
              {imagePreview ? (
                <Image src={imagePreview} alt="Profile" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-placeholder bg-[#1a1a1a]">
                  <User size={72} strokeWidth={1.5} />
                </div>
              )}

              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera size={28} className="text-surface-white mb-2" />
                <span className="text-xs text-surface-white font-bold uppercase tracking-widest">Upload Photo</span>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/jpeg, image/png, image/jpg, image/webp"
              className="hidden"
            />

            <p className="text-text-placeholder text-xs text-center leading-relaxed">
              Click the image to upload a new avatar.<br/>Max size: 5MB. Format: JPG, PNG, WEBP.
            </p>
            {isUploadingImage && <p className="text-text-accent text-xs font-bold mt-3 animate-pulse uppercase tracking-wider">Uploading...</p>}
          </div>

          {/* Forms Section */}
          <div className="w-full md:w-2/3 flex flex-col gap-8">

            {/* Personal Details */}
            <div className='bg-[#111] border border-stroke-strong rounded-[8px] p-6 sm:p-8 shadow-sm'>
              <h2 className="font-bebas text-2xl tracking-[1px] uppercase mb-6 text-surface-white flex items-center gap-2">
                <User size={20} className="text-text-accent" />
                Personal Information
              </h2>
              <form onSubmit={handleProfileSubmit} className='flex flex-col gap-5'>
                <AuthInput
                  name="name"
                  label='FULL NAME'
                  placeholder='Enter your full name'
                  icon={<User size={16} />}
                  value={profileValues.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  onBlur={() => handleProfileBlur("name")}
                  error={profileTouched.name ? profileErrors.name : undefined}
                />

                <AuthInput
                  name="phone"
                  label='PHONE NUMBER'
                  placeholder='Enter your phone number (optional)'
                  icon={<Phone size={16} />}
                  value={profileValues.phone}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                  onBlur={() => handleProfileBlur("phone")}
                  error={profileTouched.phone ? profileErrors.phone : undefined}
                />

                <button
                  type='submit'
                  disabled={isUpdatingProfile}
                  className='w-full mt-4 bg-btn-primary hover:bg-btn-primary-hover focus:ring-text-accent focus:ring-offset-card-dark text-surface-white font-semibold text-sm uppercase py-4 rounded-[6px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 tracking-wide'>
                  {isUpdatingProfile ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className='bg-[#111] border border-stroke-strong rounded-[8px] p-6 sm:p-8 shadow-sm'>
              <h2 className="font-bebas text-2xl tracking-[1px] uppercase mb-6 text-surface-white flex items-center gap-2">
                <Lock size={20} className="text-text-accent" />
                Security Settings
              </h2>
              <form onSubmit={handlePwdSubmit} className='flex flex-col gap-5'>
                <AuthInput
                  name="oldPassword"
                  label='CURRENT PASSWORD'
                  type="password"
                  placeholder='Enter current password'
                  icon={<Lock size={16} />}
                  value={pwdValues.oldPassword}
                  onChange={(e) => handlePwdChange("oldPassword", e.target.value)}
                  onBlur={() => handlePwdBlur("oldPassword")}
                  error={pwdTouched.oldPassword ? pwdErrors.oldPassword : undefined}
                />

                <AuthInput
                  name="newPassword"
                  label='NEW PASSWORD'
                  type="password"
                  placeholder='Enter new password'
                  icon={<Lock size={16} />}
                  value={pwdValues.newPassword}
                  onChange={(e) => handlePwdChange("newPassword", e.target.value)}
                  onBlur={() => handlePwdBlur("newPassword")}
                  error={pwdTouched.newPassword ? pwdErrors.newPassword : undefined}
                />

                <AuthInput
                  name="confirmPassword"
                  label='CONFIRM NEW PASSWORD'
                  type="password"
                  placeholder='Confirm new password'
                  icon={<Lock size={16} />}
                  value={pwdValues.confirmPassword}
                  onChange={(e) => handlePwdChange("confirmPassword", e.target.value)}
                  onBlur={() => handlePwdBlur("confirmPassword")}
                  error={pwdTouched.confirmPassword ? pwdErrors.confirmPassword : undefined}
                />

                <button
                  type='submit'
                  disabled={isChangingPassword}
                  className='w-full mt-4 border border-stroke-medium text-surface-white hover:bg-surface-white/5 font-semibold text-sm uppercase py-4 rounded-[6px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed tracking-wide'>
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
