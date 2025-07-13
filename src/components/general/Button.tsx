import type React from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "danger" | "success" | "light" | "outline";
  type?: "button" | "submit" | "reset";
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  type = "button",
  label,
  onClick,
  loading = false,
  disabled = false,
  className = "",
  icon,
  size = "md",
  fullWidth = false,
}) => {
  const baseClasses = `
    font-semibold rounded-xl transition-all duration-200 
    flex items-center justify-center gap-2 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:cursor-not-allowed transform active:scale-95
    ${fullWidth ? "w-full" : ""}
  `;

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 text-white 
      hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500
      disabled:from-blue-300 disabled:to-blue-300 disabled:hover:from-blue-300 disabled:hover:to-blue-300
      shadow-lg hover:shadow-xl hover:scale-105
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 
      hover:from-gray-200 hover:to-gray-300 focus:ring-gray-500
      disabled:from-gray-50 disabled:to-gray-50 disabled:text-gray-400
      border border-gray-300 hover:border-gray-400 hover:scale-105
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-700 text-white 
      hover:from-red-700 hover:to-red-800 focus:ring-red-500
      disabled:from-red-300 disabled:to-red-300
      shadow-lg hover:shadow-xl hover:scale-105
    `,
    success: `
      bg-gradient-to-r from-green-600 to-green-700 text-white 
      hover:from-green-700 hover:to-green-800 focus:ring-green-500
      disabled:from-green-300 disabled:to-green-300
      shadow-lg hover:shadow-xl hover:scale-105
    `,
    light: `
      bg-white/90 backdrop-blur-sm text-gray-700 
      hover:bg-white hover:text-gray-900 focus:ring-gray-500
      disabled:bg-gray-50 disabled:text-gray-400
      border border-gray-200 hover:border-gray-300 hover:scale-105
      shadow-sm hover:shadow-md
    `,
    outline: `
      bg-transparent text-blue-600 border-2 border-blue-600
      hover:bg-blue-600 hover:text-white focus:ring-blue-500
      disabled:border-blue-300 disabled:text-blue-300
      hover:scale-105
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default Button;
