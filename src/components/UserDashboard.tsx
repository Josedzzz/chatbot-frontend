import { useEffect, useState } from "react";
import {
  ChatHistoryData,
  chatService,
  loadChatHistoryService,
} from "../services/chatService";
import UserHeader from "./UserHeader";

interface UserDashboardProps {
  userId: string;
}

export default function UserDashboard({ userId }: UserDashboardProps) {
  const [chatHistory, setChatHistory] = useState<ChatHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  /**
   * Gets the user's chat history
   */
  const loadChatHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
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

  /**
   * Send a message and load the chat again
   * @returns
   */
  const sendMessage = async () => {
    if (newMessage.trim()) return;
    try {
      setIsLoading(true);
      setError(null);
      const response = await chatService({ userId, prompt: newMessage });
      if (response.success) {
        setNewMessage("");
        await loadChatHistory();
      } else {
        setError(response.error.message || "Failed to send the message");
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChatHistory();
  });

  return (
    <div className="min-h-screen bg-custom-beige flex flex-col">
      <div className="p-3">
        <UserHeader title={chatHistory?.title || "Loading chat..."} />
      </div>
    </div>
  );
}
