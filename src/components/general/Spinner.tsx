import type React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "purple" | "gray";
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "blue",
  text,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    blue: "text-blue-600",
    purple: "text-purple-600",
    gray: "text-gray-600",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <AiOutlineLoading3Quarters
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
      />
      {text && <p className="mt-4 text-gray-600 font-medium">{text}</p>}
    </div>
  );
};

export default Spinner;
