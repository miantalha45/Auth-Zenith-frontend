import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import moment from "moment";
import {
  AiOutlineMessage,
  AiOutlineReload,
  AiOutlineSearch,
} from "react-icons/ai";
import type { IMessageDto } from "../../types/message.types";
import Spinner from "../../components/general/Spinner";
import Button from "../../components/general/Button";
import axiosInstance from "../../utils/axiosInstance";
import { ALL_MESSAGES_URL } from "../../utils/globalConfig";

const AllMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<IMessageDto[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<IMessageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getAllMessages = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IMessageDto[]>(ALL_MESSAGES_URL);
      setMessages(response.data);
      setFilteredMessages(response.data);
    } catch (error) {
      toast.error("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  useEffect(() => {
    const filtered = messages.filter(
      (message) =>
        message.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.senderUserName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        message.receiverUserName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchTerm, messages]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" text="Loading all messages..." />
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
              <div className="p-3 bg-purple-100 rounded-xl">
                <AiOutlineMessage className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  All Messages
                </h1>
                <p className="text-gray-600">System-wide message overview</p>
              </div>
            </div>
            <Button
              variant="secondary"
              label="Refresh"
              onClick={getAllMessages}
              icon={<AiOutlineReload className="h-5 w-5" />}
              disabled={loading}
            />
          </div>
        </div>

        {/* Search and Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages, users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Total: {messages.length}</span>
              <span>Filtered: {filteredMessages.length}</span>
            </div>
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Message History
            </h2>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="p-12 text-center">
              <AiOutlineMessage className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No messages found" : "No messages yet"}
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Messages will appear here once users start communicating"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      From
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      To
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <tr
                      key={message.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {moment(message.createdAt).format("MMM DD, YYYY HH:mm")}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 max-w-md truncate">
                          {message.text}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {message.senderUserName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {message.receiverUserName}
                        </span>
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

export default AllMessagesPage;
