import type React from "react";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import type { ILoginDto } from "../../types/auth.types";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";
import AuthLayout from "../../components/layout/AuthLayout";
import useAuth from "../../hooks/useAuth.hook";
import { PATH_PUBLIC } from "../../routes/path";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { login } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  const loginSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must not exceed 50 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ILoginDto>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmitLoginForm = async (data: ILoginDto): Promise<void> => {
    try {
      setLoading(true);
      await login(data.userName, data.password);
    } catch (error) {
      const err = error as { data: string; status: number };
      const { status, data: errorData } = err;

      switch (status) {
        case 401:
          toast.error("Invalid username or password. Please try again.");
          break;
        case 429:
          toast.error("Too many login attempts. Please try again later.");
          break;
        case 403:
          toast.error("Account is temporarily locked. Contact support.");
          break;
        default:
          toast.error(errorData || "Login failed. Please contact support.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (): void => {
    reset();
    setRememberMe(false);
    toast.success("Form cleared successfully");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your dashboard"
    >
      <form onSubmit={handleSubmit(onSubmitLoginForm)} className="space-y-6">
        <InputField
          control={control}
          label="Username"
          inputName="userName"
          placeholder="Enter your username"
          error={errors.userName?.message}
          icon={<AiOutlineUser className="h-5 w-5" />}
          required
        />

        <InputField
          control={control}
          label="Password"
          inputName="password"
          inputType="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          icon={<AiOutlineLock className="h-5 w-5" />}
          required
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            variant="primary"
            type="submit"
            label="Sign In"
            onClick={() => {}}
            loading={loading}
            fullWidth
            size="lg"
            disabled={!isValid}
          />

          <Button
            variant="secondary"
            type="button"
            label="Clear Form"
            onClick={handleReset}
            fullWidth
            disabled={loading}
          />
        </div>

        {/* Register Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            to={PATH_PUBLIC.register}
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
          >
            Create Account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
