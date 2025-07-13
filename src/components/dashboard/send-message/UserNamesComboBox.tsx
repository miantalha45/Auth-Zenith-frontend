import type React from "react";
import { useState } from "react";
import { type Control, Controller } from "react-hook-form";
import { AiOutlineUser, AiOutlineDown, AiOutlineCheck } from "react-icons/ai";

interface UsernamesComboBoxProps {
  usernames: string[];
  control: Control<any>;
  name: string;
  error?: string;
}

const UsernamesComboBox: React.FC<UsernamesComboBoxProps> = ({
  usernames,
  control,
  name,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsernames = usernames.filter((username) =>
    username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Select Recipient
        <span className="text-red-500 ml-1">*</span>
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <div
              className={`
                w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500/20
                cursor-pointer flex items-center justify-between
                ${
                  error
                    ? "border-red-300 bg-red-50 focus-within:border-red-500 focus-within:ring-red-500/20"
                    : "border-gray-300 bg-white hover:border-gray-400"
                }
              `}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center gap-3">
                <AiOutlineUser className="h-5 w-5 text-gray-400" />
                <span
                  className={field.value ? "text-gray-900" : "text-gray-500"}
                >
                  {field.value || "Select a username..."}
                </span>
              </div>
              <AiOutlineDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-hidden">
                <div className="p-3 border-b border-gray-100">
                  <input
                    type="text"
                    placeholder="Search usernames..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="max-h-40 overflow-y-auto">
                  {filteredUsernames.length > 0 ? (
                    filteredUsernames.map((username) => (
                      <div
                        key={username}
                        onClick={() => {
                          field.onChange(username);
                          setIsOpen(false);
                          setSearchTerm("");
                        }}
                        className={`
                          px-4 py-3 cursor-pointer transition-colors flex items-center justify-between
                          hover:bg-blue-50 hover:text-blue-700
                          ${
                            field.value === username
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-700"
                          }
                        `}
                      >
                        <span className="font-medium">{username}</span>
                        {field.value === username && (
                          <AiOutlineCheck className="h-4 w-4" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-center">
                      No usernames found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      />

      {error && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-red-500">⚠</span>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UsernamesComboBox;
