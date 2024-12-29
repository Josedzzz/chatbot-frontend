import { useEffect, useState } from "react";
import {
  ChatHistoryData,
  loadChatHistoryService,
} from "../services/chatService";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

export default function UserDashboard() {
  const [chatHistory, setChatHistory] = useState<ChatHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Gets the user's chat history
   */
  const loadChatHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userId = localStorage.getItem("userId");
      if (userId == null) {
        return;
      }
      const response = await loadChatHistoryService(userId);
      if (response.success) {
        setChatHistory(response.data);
      } else {
        setError(response.error.message || "Failed to load chat history");
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  return (
    <div className="min-h-screen bg-custom-beige flex flex-col">
      <div className="p-3 fixed top-0 w-full z-10">
        <UserHeader title={chatHistory?.title || "Loading chat..."} />
      </div>

      {/* Chat messages */}
      <div className="flex-1 mt-16 mb-16 overflow-y-auto p-4">
        {isLoading ? (
          <i className="fa fa-spinner fa-spin"></i>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : chatHistory?.messages.length ? (
          chatHistory.messages.map((message) => (
            <div
              key={message._id}
              className={`flex mb-4 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md p-3 rounded-lg shadow`}
                style={{
                  backgroundColor:
                    message.sender === "user" ? "#F0F0F0" : "#0F0F0F",
                  color: message.sender === "user" ? "#0F0F0F" : "#F0F0F0",
                }}
              >
                <p>{message.message}</p>
                <small className="text-sm block mt-2 opacity-70">
                  {new Date(message.timestamp).toLocaleString()}
                </small>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-custom-black">No messages yet</p>
        )}
      </div>

      {/* Input section */}
      <div className="fixed bottom-0 w-full">
        <UserFooter />
      </div>
    </div>
  );
}
