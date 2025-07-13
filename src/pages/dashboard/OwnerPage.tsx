"use client";

import type React from "react";
import { FaUserCog } from "react-icons/fa";
import {
  AiOutlineCheck,
  AiOutlineDollarCircle,
  AiOutlineBarChart,
  AiOutlineGlobal,
  AiOutlineApi,
  AiOutlineUser,
} from "react-icons/ai";

const OwnerPage: React.FC = () => {
  const ownerFeatures = [
    "Access comprehensive business analytics and reports",
    "Manage billing, subscriptions, and financial settings",
    "Define and enforce global platform policies",
    "Oversee all administrative and operational functions",
    "Strategic planning and high-level decision making",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 w-full">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-gray-100 rounded-full">
              <FaUserCog className="h-16 w-16 text-gray-700" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Owner Access Level
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Welcome to the Owner dashboard. You have ultimate control over the
            entire platform's operations and strategy.
          </p>

          <div className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold">
            <AiOutlineUser className="h-5 w-5 mr-2" />
            Owner Role Active
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Available Features
            </h2>
            <div className="space-y-3">
              {ownerFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <AiOutlineCheck className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Role Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Role Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AiOutlineUser className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Access Level</p>
                  <p className="font-semibold text-gray-900">Platform Owner</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AiOutlineGlobal className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Permissions</p>
                  <p className="font-semibold text-gray-900">
                    Full Administrative & Strategic Control
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
              <div className="text-2xl mb-2">
                <AiOutlineDollarCircle className="mx-auto text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Billing</span>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-center">
              <div className="text-2xl mb-2">
                <AiOutlineBarChart className="mx-auto text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Analytics
              </span>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-center">
              <div className="text-2xl mb-2">
                <AiOutlineApi className="mx-auto text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Policies
              </span>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-center">
              <div className="text-2xl mb-2">
                <AiOutlineGlobal className="mx-auto text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Global Settings
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerPage;
