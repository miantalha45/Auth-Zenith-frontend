import type React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineArrowLeft } from "react-icons/ai";
import Button from "../../components/general/Button";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-lg">
        {/* 404 Animation */}
        <div className="relative">
          <div className="text-9xl font-bold text-gray-200 select-none animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-16 h-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
            The page you're looking for seems to have wandered off into the
            digital void. Let's get you back on track!
          </p>
        </div>

        {/* Helpful Information */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">What happened?</h3>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              The page may have been moved or deleted
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              You might have typed the URL incorrectly
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              The link you followed might be outdated
            </li>
          </ul>
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

        {/* Support Section */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Still need help? We're here for you!
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:support@devempower.com"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors"
            >
              📧 Email Support
            </a>
            <a
              href="/help"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors"
            >
              📚 Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
