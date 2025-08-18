"use client";

import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">

        <input
          {...props}
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={`mt-1 block w-full rounded-md border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-0 right-0 h-10 flex items-center px-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <Eye />
          ) : (
            <EyeOff />
          )}
        </button>

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";