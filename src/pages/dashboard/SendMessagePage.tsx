import type React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai";
import type { ISendMessageDto } from "../../types/message.types";
import InputField from "../../components/general/InputField";
import UsernamesComboBox from "../../components/dashboard/send-message/UserNamesComboBox";
import Spinner from "../../components/general/Spinner";
import Button from "../../components/general/Button";
import axiosInstance from "../../utils/axiosInstance";
import {
  CREATE_MESSAGE_URL,
  USERNAMES_LIST_URL,
} from "../../utils/globalConfig";
import { PATH_DASHBOARD } from "../../routes/path";

const SendMessagePage: React.FC = () => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const navigate = useNavigate();

  const sendMessageSchema = Yup.object().shape({
    receiverUserName: Yup.string()
      .required("Recipient is required")
      .oneOf(usernames, "Please select a valid username"),
    text: Yup.string()
      .required("Message text is required")
      .min(1, "Message cannot be empty")
      .max(500, "Message must not exceed 500 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<ISendMessageDto>({
    resolver: yupResolver(sendMessageSchema),
    defaultValues: {
      receiverUserName: "",
      text: "",
    },
    mode: "onChange",
  });

  const messageText = watch("text");

  const getUsernamesList = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<string[]>(USERNAMES_LIST_URL);
      setUsernames(response.data);
    } catch (error) {
      toast.error("Failed to load usernames. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsernamesList();
  }, []);

  const onSubmitSendMessageForm = async (
    data: ISendMessageDto
  ): Promise<void> => {
    try {
      setSending(true);
      await axiosInstance.post(CREATE_MESSAGE_URL, data);
      toast.success("Message sent successfully!");
      navigate(PATH_DASHBOARD.inbox);
    } catch (error) {
      const err = error as { data: string; status: number };
      if (err.status === 400) {
        toast.error(err.data || "Invalid message data");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
      reset();
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" text="Loading usernames..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Send Message</h1>
              <p className="text-gray-600 mt-2">
                Compose and send a message to another user
              </p>
            </div>
            <button
              onClick={() => navigate(PATH_DASHBOARD.inbox)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmitSendMessageForm)}
            className="space-y-6"
          >
            <UsernamesComboBox
              usernames={usernames}
              control={control}
              name="receiverUserName"
              error={errors.receiverUserName?.message}
            />

            <div>
              <InputField
                control={control}
                label="Message"
                inputName="text"
                placeholder="Type your message here..."
                error={errors.text?.message}
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  {messageText?.length || 0}/500 characters
                </p>
                <div
                  className={`text-sm ${
                    messageText?.length > 450 ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {messageText?.length > 450 && "Approaching character limit"}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                variant="secondary"
                type="button"
                label="Cancel"
                onClick={() => navigate(PATH_DASHBOARD.inbox)}
                fullWidth
                disabled={sending}
              />
              <Button
                variant="primary"
                type="submit"
                label="Send Message"
                onClick={() => {}}
                loading={sending}
                fullWidth
                disabled={!isValid}
                icon={<AiOutlineSend className="h-5 w-5" />}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
