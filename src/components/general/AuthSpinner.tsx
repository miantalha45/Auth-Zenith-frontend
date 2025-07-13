import type React from "react";
import { PiDetective } from "react-icons/pi";

const AuthSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center space-y-6">
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute inset-8 flex items-center justify-center">
            <PiDetective className="w-12 h-12 text-purple-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Authenticating...
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your credentials
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSpinner;
