import type React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEnvironment,
} from "react-icons/ai";
import type { IRegisterDto } from "../../types/auth.types";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";
import useAuth from "../../hooks/useAuth.hook";
import { PATH_PUBLIC } from "../../routes/path";
import AuthLayout from "../../components/layout/AuthLayout";

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { register } = useAuth();

  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must not exceed 50 characters")
      .matches(
        /^[A-Za-z\s]+$/,
        "First name can only contain letters and spaces"
      ),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must not exceed 50 characters")
      .matches(
        /^[A-Za-z\s]+$/,
        "Last name can only contain letters and spaces"
      ),
    userName: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must not exceed 30 characters")
      .matches(
        /^[A-Za-z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .max(100, "Email must not exceed 100 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
    address: Yup.string()
      .required("Address is required")
      .min(10, "Address must be at least 10 characters")
      .max(200, "Address must not exceed 200 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    trigger,
  } = useForm<IRegisterDto>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      address: "",
    },
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmitRegisterForm = async (data: IRegisterDto): Promise<void> => {
    try {
      setLoading(true);
      await register(
        data.firstName,
        data.lastName,
        data.userName,
        data.email,
        data.password,
        data.address
      );
      toast.success("Registration successful! Welcome to Dev Empower.");
    } catch (error) {
      const err = error as { data: string; status: number };
      const { status, data: errorData } = err;

      switch (status) {
        case 400:
          toast.error("Invalid registration data. Please check your inputs.");
          break;
        case 409:
          toast.error(
            "Username or email already exists. Please choose different ones."
          );
          break;
        case 422:
          toast.error("Validation failed. Please check all required fields.");
          break;
        default:
          toast.error(
            errorData || "Registration failed. Please contact support."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (): void => {
    reset();
    setCurrentStep(1);
    toast.success("Form cleared successfully");
  };

  const getPasswordStrength = (
    password: string
  ): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Very Weak", color: "bg-red-500" },
      { strength: 2, label: "Weak", color: "bg-orange-500" },
      { strength: 3, label: "Fair", color: "bg-yellow-500" },
      { strength: 4, label: "Good", color: "bg-blue-500" },
      { strength: 5, label: "Strong", color: "bg-green-500" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(password);

  const handleNextStep = async () => {
    const fieldsToValidate =
      currentStep === 1
        ? ["firstName", "lastName", "userName"]
        : ["email", "password", "address"];
    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid) {
      setCurrentStep(2);
    }
  };

  return (
    <AuthLayout
      title="Join Dev Empower"
      subtitle="Create your account to get started"
    >
      <form onSubmit={handleSubmit(onSubmitRegisterForm)} className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div
              className={`w-16 h-1 ${
                currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                control={control}
                label="First Name"
                inputName="firstName"
                placeholder="John"
                error={errors.firstName?.message}
                icon={<AiOutlineUser className="h-5 w-5" />}
                required
              />

              <InputField
                control={control}
                label="Last Name"
                inputName="lastName"
                placeholder="Doe"
                error={errors.lastName?.message}
                icon={<AiOutlineUser className="h-5 w-5" />}
                required
              />
            </div>

            <InputField
              control={control}
              label="Username"
              inputName="userName"
              placeholder="johndoe123"
              error={errors.userName?.message}
              icon={<AiOutlineUser className="h-5 w-5" />}
              helperText="Choose a unique username (letters, numbers, and underscores only)"
              required
            />

            <Button
              variant="primary"
              type="button"
              label="Continue"
              onClick={handleNextStep}
              fullWidth
              size="lg"
            />
          </div>
        )}

        {/* Step 2: Account Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Account Details
              </h3>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                ← Back
              </button>
            </div>

            <InputField
              control={control}
              label="Email"
              inputName="email"
              inputType="email"
              placeholder="john@example.com"
              error={errors.email?.message}
              icon={<AiOutlineMail className="h-5 w-5" />}
              required
            />

            <div>
              <InputField
                control={control}
                label="Password"
                inputName="password"
                inputType="password"
                placeholder="Create a strong password"
                error={errors.password?.message}
                icon={<AiOutlineLock className="h-5 w-5" />}
                required
              />

              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span
                      className={`text-xs font-medium ${passwordStrength.color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <InputField
              control={control}
              label="Address"
              inputName="address"
              placeholder="123 Main St, City, Country"
              error={errors.address?.message}
              icon={<AiOutlineEnvironment className="h-5 w-5" />}
              required
            />

            <div className="space-y-4 pt-4">
              <Button
                variant="primary"
                type="submit"
                label="Create Account"
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
          </div>
        )}

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            to={PATH_PUBLIC.login}
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
          >
            Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
