import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import moment from "moment";
import {
  AiOutlineOrderedList,
  AiOutlineReload,
  AiOutlineSearch,
  AiOutlineFilter,
} from "react-icons/ai";
import type { ILogDto } from "../../types/log.types";
import Spinner from "../../components/general/Spinner";
import Button from "../../components/general/Button";
import axiosInstance from "../../utils/axiosInstance";
import { LOGS_URL } from "../../utils/globalConfig";

const SystemLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<ILogDto[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ILogDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const getSystemLogs = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ILogDto[]>(LOGS_URL);
      setLogs(response.data);
      setFilteredLogs(response.data);
    } catch (error) {
      toast.error("Failed to load system logs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSystemLogs();
  }, []);

  useEffect(() => {
    let filtered = logs.filter((log) =>
      log.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedUser) {
      filtered = filtered.filter((log) => log.userName === selectedUser);
    }

    setFilteredLogs(filtered);
  }, [searchTerm, selectedUser, logs]);

  const uniqueUsers = Array.from(
    new Set(logs.map((log) => log.userName))
  ).sort();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" text="Loading system logs..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <AiOutlineOrderedList className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  System Logs
                </h1>
                <p className="text-gray-600">
                  Monitor all system activities and user actions
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              label="Refresh"
              onClick={getSystemLogs}
              icon={<AiOutlineReload className="h-5 w-5" />}
              disabled={loading}
            />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>

              <div className="relative">
                <AiOutlineFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white"
                >
                  <option value="">All Users</option>
                  {uniqueUsers.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Total: {logs.length}</span>
              <span>Filtered: {filteredLogs.length}</span>
              <span>Users: {uniqueUsers.length}</span>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Activity Log
            </h2>
          </div>

          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center">
              <AiOutlineOrderedList className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || selectedUser
                  ? "No logs found"
                  : "No system logs yet"}
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedUser
                  ? "Try adjusting your search or filter"
                  : "System activities will be logged here"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Activity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLogs.map((log, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {moment(log.createdAt).format("MMM DD, YYYY HH:mm")}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {log.userName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {log.description}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemLogsPage;
