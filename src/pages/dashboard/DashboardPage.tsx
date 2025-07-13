import type React from "react";
import { BsGlobeAmericas } from "react-icons/bs";
import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate";

const DashboardPage: React.FC = () => {
  const dashboardFeatures = [
    "Comprehensive user management",
    "System-wide activity logging",
    "Real-time message monitoring",
    "Role-based access control",
    "Detailed analytics and reports",
  ];

  return (
    <PageAccessTemplate
      color="#007bff" // A vibrant blue for general dashboard access
      icon={BsGlobeAmericas}
      role="Dashboard"
      description="This is the central hub for all operations. Your access level determines the features available to you."
      features={dashboardFeatures}
    >
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Access Levels:</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li>
            <span className="font-semibold text-purple-700">Owner:</span> Full
            control over all system functionalities.
          </li>
          <li>
            <span className="font-semibold text-blue-700">Admin:</span>{" "}
            Extensive management capabilities, including user roles.
          </li>
          <li>
            <span className="font-semibold text-green-700">Manager:</span>{" "}
            Oversees specific operational areas and teams.
          </li>
          <li>
            <span className="font-semibold text-yellow-700">User:</span> Access
            to personal data, messaging, and basic features.
          </li>
        </ul>
        <p className="text-gray-600 mt-4">
          Navigate through the sidebar to explore features available to your
          role.
        </p>
      </div>
    </PageAccessTemplate>
  );
};

export default DashboardPage;
