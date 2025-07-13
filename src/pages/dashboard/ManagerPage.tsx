"use client";

import type React from "react";
import { FaUserTie } from "react-icons/fa";
import {
  AiOutlineCheck,
  AiOutlineTeam,
  AiOutlineProject,
  AiOutlineFileText,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";

const ManagerPage: React.FC = () => {
  const managerFeatures = [
    "Oversee team performance and productivity",
    "Manage project timelines and deliverables",
    "Approve and track team requests",
    "Generate detailed team and project reports",
    "Access operational dashboards",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 w-full">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-teal-100 rounded-full">
              <FaUserTie className="h-16 w-16 text-teal-600" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Manager Access Level
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Welcome to the Manager dashboard. You have elevated access to team
            and project management features.
          </p>

          <div className="inline-flex items-center px-6 py-3 bg-teal-100 text-teal-800 rounded-full font-semibold">
            <AiOutlineUser className="h-5 w-5 mr-2" />
            Manager Role Active
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Available Features
            </h2>
            <div className="space-y-3">
              {managerFeatures.map((feature, index) => (
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
                  <p className="font-semibold text-gray-900">Team Manager</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AiOutlineSetting className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Permissions</p>
                  <p className="font-semibold text-gray-900">
                    Team & Project Management
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
                <AiOutlineTeam className="mx-auto text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Manage Team
              </span>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-center">
              <div className="text-2xl mb-2">
                <AiOutlineProject className="mx-auto text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                View Projects
              </span>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-center">
              <div className="text-2xl mb-2">
                <AiOutlineFileText className="mx-auto text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Reports</span>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-center">
              <div className="text-2xl mb-2">
                <AiOutlineSetting className="mx-auto text-orange-600" />
              </div>
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

export default ManagerPage;
