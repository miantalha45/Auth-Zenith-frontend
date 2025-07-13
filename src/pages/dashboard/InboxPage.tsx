import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import moment from "moment";
import {
  AiOutlineInbox,
  AiOutlineSend,
  AiOutlineReload,
  AiOutlinePlus,
} from "react-icons/ai";
import { MdInput, MdOutput } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { IMessageDto } from "../../types/message.types";
import Spinner from "../../components/general/Spinner";
import Button from "../../components/general/Button";
import useAuth from "../../hooks/useAuth.hook";
import axiosInstance from "../../utils/axiosInstance";
import { MY_MESSAGE_URL } from "../../utils/globalConfig";
import { PATH_DASHBOARD } from "../../routes/path";

const InboxPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<IMessageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const navigate = useNavigate();

  const getMyMessages = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IMessageDto[]>(MY_MESSAGE_URL);
      setMessages(response.data);
    } catch (error) {
      toast.error("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyMessages();
  }, []);

  const getMessageStats = () => {
    const sent = messages.filter(
      (msg) => msg.senderUserName === user?.userName
    ).length;
    const received = messages.filter(
      (msg) => msg.receiverUserName === user?.userName
    ).length;
    return { sent, received, total: messages.length };
  };

  const stats = getMessageStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" text="Loading messages..." />
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
              <div className="p-3 bg-blue-100 rounded-xl">
                <AiOutlineInbox className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
                <p className="text-gray-600">
                  Manage your messages and conversations
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                label="Refresh"
                onClick={getMyMessages}
                icon={<AiOutlineReload className="h-5 w-5" />}
                disabled={loading}
              />
              <Button
                variant="primary"
                label="New Message"
                onClick={() => navigate(PATH_DASHBOARD.sendMessage)}
                icon={<AiOutlinePlus className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <MdInput className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Received</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.received}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <MdOutput className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sent</p>
                <p className="text-2xl font-bold text-gray-900">{stats.sent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <AiOutlineInbox className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Messages
            </h2>
          </div>

          {messages.length === 0 ? (
            <div className="p-12 text-center">
              <AiOutlineInbox className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No messages yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start a conversation by sending your first message
              </p>
              <Button
                variant="primary"
                label="Send Message"
                onClick={() => navigate(PATH_DASHBOARD.sendMessage)}
                icon={<AiOutlineSend className="h-5 w-5" />}
              />
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
                      Type
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
                  {messages.map((message) => (
                    <tr
                      key={message.id}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                        selectedMessage === message.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() =>
                        setSelectedMessage(
                          selectedMessage === message.id ? null : message.id
                        )
                      }
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {moment(message.createdAt).fromNow()}
                      </td>
                      <td className="px-6 py-4">
                        {message.senderUserName === user?.userName ? (
                          <div className="flex items-center gap-2">
                            <MdOutput className="h-5 w-5 text-blue-500" />
                            <span className="text-sm text-blue-600 font-medium">
                              Sent
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <MdInput className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-green-600 font-medium">
                              Received
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 line-clamp-2">
                          {message.text}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {message.senderUserName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
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

export default InboxPage;
