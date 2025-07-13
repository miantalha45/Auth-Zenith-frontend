import type React from "react";
import { useState } from "react";
import { type Control, Controller } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

interface InputFieldProps {
  control: Control<any>;
  label?: string;
  inputName: string;
  inputType?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  helperText?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  control,
  label,
  inputName,
  inputType = "text",
  placeholder,
  error,
  disabled = false,
  className = "",
  helperText,
  required = false,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPasswordField = inputType === "password";

  return (
    <div className={`w-full mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <Controller
          name={inputName}
          control={control}
          render={({ field, fieldState }) => (
            <input
              {...field}
              type={isPasswordField && showPassword ? "text" : inputType}
              placeholder={
                placeholder || (label ? `Enter ${label.toLowerCase()}` : "")
              }
              disabled={disabled}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`
                w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500/20
                disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
                ${icon ? "pl-10" : ""}
                ${isPasswordField ? "pr-12" : ""}
                ${
                  error
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                    : fieldState.isDirty && !error
                    ? "border-green-300 bg-green-50 focus:border-green-500 focus:ring-green-500/20"
                    : isFocused
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-white hover:border-gray-400"
                }
              `}
            />
          )}
        />

        {/* Password Toggle */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="h-5 w-5" />
            ) : (
              <AiOutlineEye className="h-5 w-5" />
            )}
          </button>
        )}

        {/* Success/Error Icon */}
        <Controller
          name={inputName}
          control={control}
          render={({ fieldState }) => (
            <>
              {fieldState.isDirty && !error && !isPasswordField && (
                <AiOutlineCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
              )}
              {error && !isPasswordField && (
                <AiOutlineExclamationCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
              )}
            </>
          )}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 flex items-center gap-2">
          <AiOutlineExclamationCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default InputField;
