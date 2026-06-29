import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, icon, label, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className='flex flex-col gap-[5px] w-full'>
        {label && (
          <label className='font-inter font-medium text-[#555] text-[10px] tracking-[0.8px] uppercase'>
            {label}
          </label>
        )}
        <div
          className={cn(
            "bg-[#1a1a1a] border border-[#1e1e1e] flex items-center p-[2px] rounded-[8px] h-[44px] transition-colors focus-within:border-[#d72322]",
            error && "border-red-500",
            className
          )}>
          {icon && (
            <div className='w-[36px] flex items-center justify-center text-[#555]'>
              {icon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              "flex-1 bg-transparent border-none outline-none text-[#fff] text-[13px] placeholder:text-[#444] px-[12px] font-inter",
              !icon && "pl-4"
            )}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='px-3 text-[#555] hover:text-[#888] focus:outline-none'>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error && <span className='text-red-500 text-xs font-inter mt-1'>{error}</span>}
      </div>
    );
  }
);
AuthInput.displayName = "AuthInput";
