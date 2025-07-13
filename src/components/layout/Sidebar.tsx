import type React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineMessage,
  AiOutlineInbox,
  AiOutlineFileText,
  AiOutlineOrderedList,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineCrown,
  AiOutlineIe,
  AiOutlineRise,
} from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import useAuth from "../../hooks/useAuth.hook";
import { PATH_DASHBOARD } from "../../routes/path";
import { RolesEnum } from "../../types/auth.types";

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles?: string[];
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      label: "Users Management",
      path: PATH_DASHBOARD.usersManagement,
      icon: <AiOutlineTeam className="h-5 w-5" />,
    },
    {
      label: "Send Message",
      path: PATH_DASHBOARD.sendMessage,
      icon: <BiMessageSquareDetail className="h-5 w-5" />,
    },
    {
      label: "Inbox",
      path: PATH_DASHBOARD.inbox,
      icon: <AiOutlineInbox className="h-5 w-5" />,
    },
    {
      label: "All Messages",
      path: PATH_DASHBOARD.allMessages,
      icon: <AiOutlineMessage className="h-5 w-5" />,
    },
    {
      label: "System Logs",
      path: PATH_DASHBOARD.systemLogs,
      icon: <AiOutlineOrderedList className="h-5 w-5" />,
    },
    {
      label: "My Logs",
      path: PATH_DASHBOARD.myLogs,
      icon: <AiOutlineFileText className="h-5 w-5" />,
    },
  ];

  const rolePages: MenuItem[] = [
    {
      label: "Owner Page",
      path: PATH_DASHBOARD.owner,
      icon: <AiOutlineCrown className="h-5 w-5" />,
      roles: [RolesEnum.OWNER],
    },
    {
      label: "Admin Page",
      path: PATH_DASHBOARD.admin,
      icon: <AiOutlineIe className="h-5 w-5" />,
      roles: [RolesEnum.OWNER, RolesEnum.ADMIN],
    },
    {
      label: "Manager Page",
      path: PATH_DASHBOARD.manager,
      icon: <AiOutlineRise className="h-5 w-5" />,
      roles: [RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.MANAGER],
    },
    {
      label: "User Page",
      path: PATH_DASHBOARD.user,
      icon: <AiOutlineUser className="h-5 w-5" />,
      roles: [
        RolesEnum.OWNER,
        RolesEnum.ADMIN,
        RolesEnum.MANAGER,
        RolesEnum.USER,
      ],
    },
  ];

  const handleNavigation = (path: string): void => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate(path);
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const hasAccess = (roles?: string[]): boolean => {
    if (!roles || !user?.roles) return true;
    console.log(roles);
    return user.roles.some((role) => roles.includes(role));
  };

  const getUserRoles = (): string => {
    if (!user?.roles) return "No roles assigned";
    return user.roles.join(", ");
  };

  console.log("User Roles:", user?.roles);

  return (
    <div
      className={`
        shrink-0 bg-gradient-to-b from-purple-700 to-purple-800 
        ${isCollapsed ? "w-16" : "w-72"} 
        min-h-[calc(100vh-48px)] flex flex-col transition-all duration-300 shadow-xl
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-purple-600">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <AiOutlineUser className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold text-lg">
                  {user?.firstName} {user?.lastName}
                </h4>
                <p className="text-purple-200 text-sm">{getUserRoles()}</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            {isCollapsed ? (
              <AiOutlineRight className="h-5 w-5" />
            ) : (
              <AiOutlineLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="text-purple-200 text-xs font-semibold uppercase tracking-wider px-3 py-2">
              Main Menu
            </h3>
          )}

          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                ${
                  isActive(item.path)
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-purple-200 hover:bg-white/10 hover:text-white"
                }
                ${isCollapsed ? "justify-center" : "justify-start"}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </div>

        {/* Role-based Pages */}
        <div className="pt-4 border-t border-purple-600">
          {!isCollapsed && (
            <h3 className="text-purple-200 text-xs font-semibold uppercase tracking-wider px-3 py-2">
              Role Pages
            </h3>
          )}

          {rolePages.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                ${
                  isActive(item.path)
                    ? "bg-white/20 text-white shadow-lg"
                    : hasAccess(item.roles)
                    ? "text-purple-200 hover:bg-white/10 hover:text-white"
                    : "text-purple-400 cursor-not-allowed opacity-50"
                }
                ${isCollapsed ? "justify-center" : "justify-start"}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!isCollapsed && (
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">{item.label}</span>
                  {!hasAccess(item.roles) && (
                    <span className="text-xs bg-red-500/20 text-red-200 px-2 py-1 rounded-full">
                      Restricted
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-purple-600">
          <div className="text-center">
            <p className="text-purple-200 text-xs">Dev Empower Dashboard</p>
            <p className="text-purple-300 text-xs">v2.0.0</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
