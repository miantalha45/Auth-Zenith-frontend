import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  AiOutlineUser,
  AiOutlineIe,
  AiOutlineArrowLeft,
  AiOutlineCheck,
} from "react-icons/ai";
import type { IAuthUser, IUpdateRoleDto } from "../../types/auth.types";
import Spinner from "../../components/general/Spinner";
import Button from "../../components/general/Button";
import useAuth from "../../hooks/useAuth.hook";
import axiosInstance from "../../utils/axiosInstance";
import { UPDATE_ROLE_URL, USERS_LIST_URL } from "../../utils/globalConfig";
import {
  allowedRolesForUpdateArray,
  isAuthorizedForUpdateRole,
} from "../../auth/auth.utils";

const UpdateRolePage: React.FC = () => {
  const { user: loggedInUser } = useAuth();
  const { userName } = useParams<{ userName: string }>();
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const navigate = useNavigate();

  const getUserByUserName = async (): Promise<void> => {
    if (!userName) {
      toast.error("Username is required");
      navigate("/dashboard/users-management");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get<IAuthUser>(
        `${USERS_LIST_URL}/${userName}`
      );
      const userData = response.data;

      if (
        !loggedInUser ||
        !isAuthorizedForUpdateRole(loggedInUser.roles[0], userData.roles[0])
      ) {
        toast.error("You are not authorized to change this user's role");
        navigate("/dashboard/users-management");
        return;
      }

      setUser(userData);
      setSelectedRole(userData.roles[0]);
    } catch (error) {
      const err = error as { data: string; status: number };
      if (err.status === 404) {
        toast.error("User not found");
      } else {
        toast.error("Failed to load user data");
      }
      navigate("/dashboard/users-management");
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (): Promise<void> => {
    if (!selectedRole || !userName) return;

    try {
      setUpdating(true);
      const updateData: IUpdateRoleDto = {
        newRole: selectedRole,
        userName,
      };
      await axiosInstance.post(UPDATE_ROLE_URL, updateData);
      toast.success("Role updated successfully!");
      navigate("/dashboard/users-management");
    } catch (error) {
      const err = error as { data: string; status: number };
      if (err.status === 403) {
        toast.error("You are not authorized to perform this action");
      } else {
        toast.error("Failed to update role. Please try again.");
      }
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    getUserByUserName();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" text="Loading user data..." />
      </div>
    );
  }

  if (!user || !loggedInUser) {
    return null;
  }

  const allowedRoles = allowedRolesForUpdateArray(loggedInUser);
  const hasChanges = selectedRole !== user.roles[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard/users-management")}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <AiOutlineArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <AiOutlineIe className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Update User Role
                  </h1>
                  <p className="text-gray-600">
                    Modify user permissions and access levels
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            User Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AiOutlineUser className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Username</p>
                  <p className="font-semibold text-gray-900">{user.userName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AiOutlineUser className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AiOutlineIe className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Current Role</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {user.roles[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Select New Role
          </h2>

          <div className="space-y-4">
            {allowedRoles.map((role) => (
              <div
                key={role}
                className={`
                  p-4 border-2 rounded-xl cursor-pointer transition-all duration-200
                  ${
                    selectedRole === role
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
                onClick={() => setSelectedRole(role)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                      w-4 h-4 rounded-full border-2 transition-colors
                      ${
                        selectedRole === role
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }
                    `}
                    >
                      {selectedRole === role && (
                        <AiOutlineCheck className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="font-semibold text-gray-900">{role}</span>
                  </div>
                  {selectedRole === role && (
                    <span className="text-sm text-blue-600 font-medium">
                      Selected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasChanges && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-amber-600">⚠️</span>
                <p className="text-sm text-amber-800">
                  <strong>Role Change:</strong> {user.roles[0]} → {selectedRole}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="secondary"
            label="Cancel"
            onClick={() => navigate("/dashboard/users-management")}
            fullWidth
            disabled={updating}
          />
          <Button
            variant="primary"
            label="Update Role"
            onClick={updateUserRole}
            loading={updating}
            fullWidth
            disabled={!hasChanges}
            icon={<AiOutlineCheck className="h-5 w-5" />}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateRolePage;
