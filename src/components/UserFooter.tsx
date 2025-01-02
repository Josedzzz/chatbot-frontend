import { useState } from "react";
import { chatService } from "../services/chatService";

interface UserFooterProps {
  reloadChatHistory: () => Promise<void>;
}

export default function UserFooter({ reloadChatHistory }: UserFooterProps) {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Send a message and load the chat again
   * @returns
   */
  const sendMessage = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");
      if (userId == null) {
        return;
      }
      const response = await chatService({ userId, prompt: message });
      if (response.success) {
        setMessage("");
        await reloadChatHistory();
      } else {
        console.log(response.error.message);
      }
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="p-4 flex items-center bg-transparent animate-fadeInScale">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isLoading && message.trim()) {
            sendMessage();
          }
        }}
        placeholder="Type your message..."
        className="flex-1 p-2 rounded-lg border-4 border-custom-black bg-custom-white focus:outline-none focus:ring-0"
      />
      <button
        onClick={sendMessage}
        disabled={isLoading || !message.trim()}
        className={`ml-2 p-2 px-6 text-custom-black font-bold border-4 border-custom-black rounded-lg ${
          isLoading
            ? "bg-custom-black text-custom-white cursor-not-allowed"
            : "hover:bg-custom-black hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105 bg-custom-white"
        }`}
      >
        {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Send"}
      </button>
    </footer>
  );
}
