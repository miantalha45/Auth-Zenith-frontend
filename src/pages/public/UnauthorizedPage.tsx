import type React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineArrowLeft,
  AiOutlineIe,
  AiOutlineUser,
} from "react-icons/ai";
import Button from "../../components/general/Button";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-lg">
        {/* 403 Animation */}
        <div className="relative">
          <div className="text-9xl font-bold text-red-100 select-none animate-pulse">
            403
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg">
              <AiOutlineIe className="w-16 h-16 text-red-500" />
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
            You don't have the necessary permissions to access this page. Please
            contact your administrator for assistance.
          </p>
        </div>

        {/* Permission Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AiOutlineUser className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">
                Insufficient Privileges
              </p>
              <p className="text-sm text-gray-500">
                Contact your administrator for access
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>This page requires special permissions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Your current role doesn't allow access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Request access from your administrator</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              variant="primary"
              label="Go Home"
              onClick={() => {}}
              icon={<AiOutlineHome className="h-5 w-5" />}
              size="lg"
            />
          </Link>

          <Button
            variant="secondary"
            label="Go Back"
            onClick={() => window.history.back()}
            icon={<AiOutlineArrowLeft className="h-5 w-5" />}
            size="lg"
          />
        </div>

        {/* Contact Support */}
        <div className="pt-8 border-t border-red-200">
          <p className="text-sm text-gray-500 mb-4">
            Need access? Get in touch with us
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:admin@devempower.com"
              className="text-red-600 hover:text-red-700 text-sm font-medium hover:underline transition-colors"
            >
              📧 Contact Admin
            </a>
            <Link
              to="/help"
              className="text-red-600 hover:text-red-700 text-sm font-medium hover:underline transition-colors"
            >
              📚 Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
