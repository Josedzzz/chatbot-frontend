import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteChatService } from "../services/chatService";

interface UserHeaderProps {
  title: string;
  reloadChatHistory: () => Promise<void>;
}

export default function UserHeader({
  title,
  reloadChatHistory,
}: UserHeaderProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Deletes the user chat
   */
  const deleteChat = async () => {
    try {
      setIsLoading(true);
      const response = await deleteChatService();
      if (response.success) {
        await reloadChatHistory();
      } else {
        console.log(response.error.message);
      }
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="h-16 p-4 w-full rounded-xl bg-custom-white border-4 border-custom-black flex justify-between items-center animate-slideIn">
      <div className="flex items-center space-x-1 gap-3">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-custom-black">
          {title}
        </h1>
        <i className="fa-solid fa-robot text-xl sm:text-3xl md:text-4xl text-custom-black"></i>
      </div>
      <div className="flex gap-6">
        <div
          onClick={deleteChat}
          className={`flex items-center gap-2 hover:scale-110 transition duration-300 ease-in-out ${isLoading ? "cursor-not-allowed" : ""}`}
        >
          <h2 className="text-xl font-bold text-custom-black">Delete chat</h2>
          <i className="fa-solid fa-trash text-lg"></i>
        </div>
        <div
          className="flex items-center gap-2 hover:scale-110 transition duration-300 ease-in-out"
          onClick={() => navigate("/login")}
        >
          <h2 className="text-xl font-bold text-custom-black">Log out</h2>
          <i className="fa-solid fa-arrow-right-from-bracket text-lg"></i>
        </div>
      </div>
    </header>
  );
}
