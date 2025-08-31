import React, { useState } from "react";
import { Eye, EyeOff, X, Loader2 } from "lucide-react";
import clsx from "clsx";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled:
    "bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500",
  outlined:
    "border border-gray-300 dark:border-gray-600 focus:border-blue-500 bg-transparent",
  ghost:
    "bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={clsx("w-full flex flex-col gap-1", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={clsx(
            "w-full rounded-2xl outline-none transition-all duration-200",
            sizeClasses[size],
            variantClasses[variant],
            invalid && "border-red-500 text-red-600 focus:border-red-500",
            disabled && "opacity-50 cursor-not-allowed",
            loading && "pr-10"
          )}
        />

        {/* Loading spinner */}
        {loading && (
          <Loader2 className="absolute right-2 animate-spin text-gray-500" size={18} />
        )}

        {/* Clear button */}
        {clearable && value && !disabled && !loading && (
          <button
            type="button"
            onClick={() =>
              onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
            }
            className="absolute right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        )}

        {/* Password toggle */}
        {type === "password" && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {/* Error or Helper Text */}
      {invalid && errorMessage ? (
        <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{helperText}</p>
      ) : null}
    </div>
    

  );
};

InputField.displayName = "InputField";

export default InputField;