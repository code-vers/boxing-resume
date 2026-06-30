"use client";

import { useRef, useState, useEffect } from "react";
import { User, Lock, Phone, Upload, Camera } from "lucide-react";
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

export function ProfileComponent() {
  const { data: profileResponse, isLoading } = useGetProfile();
  const profile = profileResponse?.data;
  
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const { mutate: uploadImage, isPending: isUploadingImage } = useUploadProfileImage();
  const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();

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
        // Construct full URL using backend URL
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
      uploadImage(file);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-white">Loading profile...</div>;
  }

  return (
    <div className='w-full bg-[#0f0f0f] text-white p-4 font-inter min-h-screen'>
      <div className='max-w-[800px] mx-auto py-12'>
        <h1 className='font-bebas text-[36px] tracking-[1.8px] uppercase mb-8 border-b border-[#222] pb-4'>
          My Profile
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div 
              className="relative w-40 h-40 rounded-full bg-[#1a1a1a] border-2 border-[#333] overflow-hidden cursor-pointer group mb-4"
              onClick={handleImageClick}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#555]">
                  <User size={64} />
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white mb-2" />
                <span className="text-xs text-white font-medium uppercase tracking-wider">Change</span>
              </div>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/jpeg, image/png, image/jpg, image/webp" 
              className="hidden" 
            />
            
            <p className="text-[#888] text-xs text-center">
              Click the image to upload a new avatar.<br/>Max size: 5MB.
            </p>
            {isUploadingImage && <p className="text-[#d72322] text-xs font-bold mt-2 animate-pulse">Uploading...</p>}
          </div>

          {/* Forms Section */}
          <div className="w-full md:w-2/3 flex flex-col gap-8">
            
            {/* Personal Details */}
            <div className='bg-[#111] border border-[#1e1e1e] rounded-[10px] p-6'>
              <h2 className="font-bebas text-[24px] tracking-[1.2px] uppercase mb-6 text-[#d72322]">
                Personal Information
              </h2>
              <form onSubmit={handleProfileSubmit} className='flex flex-col gap-5'>
                <AuthInput
                  name="name"
                  label='FULL NAME'
                  placeholder='Enter your name'
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
                  className='w-full bg-[#333] hover:bg-[#444] text-white font-inter font-bold text-sm uppercase py-4 rounded-[8px] transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed'>
                  {isUpdatingProfile ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className='bg-[#111] border border-[#1e1e1e] rounded-[10px] p-6'>
              <h2 className="font-bebas text-[24px] tracking-[1.2px] uppercase mb-6 text-[#d72322]">
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
                  className='w-full border border-[#d72322] text-[#d72322] hover:bg-[#d72322] hover:text-white font-inter font-bold text-sm uppercase py-4 rounded-[8px] transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed'>
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
