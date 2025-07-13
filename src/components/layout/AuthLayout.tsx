import type React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  version?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  version = "2.0.0",
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-white">Dev Empower</h1>
                <p className="text-2xl text-purple-100 font-medium">
                  A Home for developers 🚀
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-semibold text-white">
                  JWT Authentication
                </h2>
                <p className="text-lg text-blue-100">
                  Secure & Professional User Management
                </p>
              </div>

              <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-white font-semibold">
                  Version {version}
                </span>
              </div>

              {/* Feature List */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>Secure Authentication</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Role-based Authorization</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Professional Dashboard</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-32 w-32 h-32 bg-amber-400/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 right-0 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl"></div>
          </div>

          {/* Right Side - Form - CENTERED */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
            <div className="w-full max-w-md mx-auto space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
                {subtitle && (
                  <p className="text-gray-600 text-lg">{subtitle}</p>
                )}
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
