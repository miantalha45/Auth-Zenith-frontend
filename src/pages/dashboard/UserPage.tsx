import type React from "react";
import { FaUser } from "react-icons/fa";
import { AiOutlineUser, AiOutlineIe, AiOutlineCheck } from "react-icons/ai";

const UserPage: React.FC = () => {
  const features = [
    "View personal dashboard",
    "Send and receive messages",
    "View personal activity logs",
    "Update profile information",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-yellow-100 rounded-full">
              <FaUser className="h-16 w-16 text-yellow-600" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            User Access Level
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Welcome to the User dashboard. You have basic access to essential
            features.
          </p>

          <div className="inline-flex items-center px-6 py-3 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
            <AiOutlineIe className="h-5 w-5 mr-2" />
            User Role Active
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Available Features
            </h2>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <AiOutlineCheck className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Role Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AiOutlineUser className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Access Level</p>
                  <p className="font-semibold text-gray-900">Standard User</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AiOutlineIe className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Permissions</p>
                  <p className="font-semibold text-gray-900">
                    Read & Write Personal Data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-center">
              <div className="text-2xl mb-2">📧</div>
              <span className="text-sm font-medium text-gray-700">
                Messages
              </span>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-center">
              <div className="text-2xl mb-2">📊</div>
              <span className="text-sm font-medium text-gray-700">My Logs</span>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-center">
              <div className="text-2xl mb-2">👤</div>
              <span className="text-sm font-medium text-gray-700">Profile</span>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <span className="text-sm font-medium text-gray-700">
                Settings
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
