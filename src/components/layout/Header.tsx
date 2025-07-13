import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineLock,
  AiOutlineUnlock,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import useAuth from "../../hooks/useAuth.hook";
import Button from "../general/Button";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../routes/path";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthLoading, isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const getUserRoles = (): string => {
    if (!user?.roles) return "No roles";
    return user.roles.join(", ");
  };

  const handleLogout = (): void => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors group"
              title="Go to Homepage"
            >
              <AiOutlineHome className="w-6 h-6 text-purple-600 group-hover:text-purple-700" />
            </button>

            {/* Status Indicators - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full border border-gray-200">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isAuthLoading
                      ? "bg-yellow-500 animate-pulse"
                      : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-xs font-medium text-gray-600">
                  Loading: {isAuthLoading ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full border border-gray-200">
                {isAuthenticated ? (
                  <AiOutlineUnlock className="w-4 h-4 text-green-600" />
                ) : (
                  <AiOutlineLock className="w-4 h-4 text-red-600" />
                )}
                <span className="text-xs font-medium text-gray-600">
                  {isAuthenticated ? "Authenticated" : "Guest"}
                </span>
              </div>

              {user && (
                <>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full border border-gray-200">
                    <AiOutlineUser className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-gray-600">
                      {user.userName}
                    </span>
                  </div>

                  <div className="px-3 py-1 bg-white/60 rounded-full border border-gray-200">
                    <span className="text-xs font-medium text-gray-600">
                      {getUserRoles()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="light"
                  label="Dashboard"
                  onClick={() => navigate(PATH_DASHBOARD.dashboard)}
                  type="button"
                  size="sm"
                />
                <Button
                  variant="outline"
                  label="Logout"
                  onClick={handleLogout}
                  type="button"
                  size="sm"
                />
              </>
            ) : (
              <>
                <Button
                  variant="light"
                  label="Register"
                  onClick={() => navigate(PATH_PUBLIC.register)}
                  type="button"
                  size="sm"
                />
                <Button
                  variant="primary"
                  label="Login"
                  onClick={() => navigate(PATH_PUBLIC.login)}
                  type="button"
                  size="sm"
                />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose className="w-6 h-6 text-gray-600" />
            ) : (
              <AiOutlineMenu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-4">
              {/* User Info */}
              {user && (
                <div className="bg-white/60 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <AiOutlineUser className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{getUserRoles()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Indicators */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-white/60 rounded-lg border border-gray-200">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isAuthLoading
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <span className="text-xs font-medium text-gray-600">
                    {isAuthLoading ? "Loading" : "Ready"}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/60 rounded-lg border border-gray-200">
                  {isAuthenticated ? (
                    <AiOutlineUnlock className="w-4 h-4 text-green-600" />
                  ) : (
                    <AiOutlineLock className="w-4 h-4 text-red-600" />
                  )}
                  <span className="text-xs font-medium text-gray-600">
                    {isAuthenticated ? "Auth" : "Guest"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="light"
                      label="Dashboard"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.dashboard);
                        setIsMobileMenuOpen(false);
                      }}
                      type="button"
                      fullWidth
                    />
                    <Button
                      variant="outline"
                      label="Logout"
                      onClick={handleLogout}
                      type="button"
                      fullWidth
                    />
                  </>
                ) : (
                  <>
                    <Button
                      variant="light"
                      label="Register"
                      onClick={() => {
                        navigate(PATH_PUBLIC.register);
                        setIsMobileMenuOpen(false);
                      }}
                      type="button"
                      fullWidth
                    />
                    <Button
                      variant="primary"
                      label="Login"
                      onClick={() => {
                        navigate(PATH_PUBLIC.login);
                        setIsMobileMenuOpen(false);
                      }}
                      type="button"
                      fullWidth
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
