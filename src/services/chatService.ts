import { ApiResponse } from "../utils/apiTypes";

interface ChatCredentials {
  userId: string;
  prompt: string;
}

interface ChatHistoryData {
  _id: string;
  userId: string;
  title: string;
  messages: Message[];
  __v: number;
}

interface Message {
  sender: "user" | "bot";
  message: string;
  timestamp: string;
  _id: string;
}

/**
 * Handle the chat response procces by sending the user petition
 * @param credentials an object containing the userId and the prompt
 * @returns a promise ApiResponse that resolves with the message or throws an error
 */
export const chatService = async (
  credentials: ChatCredentials,
): Promise<ApiResponse<string>> => {
  try {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="));
    const authToken = cookies ? cookies.split("=")[1] : null;
    if (!authToken) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch("http://localhost:3000/chat/message", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(credentials),
    });

    const responseData: ApiResponse<string> = await response.json();
    if (!response.ok || !responseData.success) {
      const errorMessage =
        responseData.success === false && responseData.error
          ? responseData.error.message
          : "An unexpected error ocurred";
      throw new Error(errorMessage);
    }

    return responseData as ApiResponse<string>;
  } catch (error) {
    console.error("Error during the chat: ", error);
    throw error;
  }
};

/**
 * Get the chat history of an user
 * @param userId the id of the user
 * @returns a promise ApiResponse that resolves with the ChatHistoryData structure or throw an error
 */
export const loadChatHistoryService = async (
  userId: string,
): Promise<ApiResponse<ChatHistoryData>> => {
  try {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="));
    const authToken = cookies ? cookies.split("=")[1] : null;
    if (!authToken) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `http://localhost:3000/chat/history/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    const responseData: ApiResponse<ChatHistoryData> = await response.json();
    if (!response.ok || !responseData.success) {
      const errorMessage =
        responseData.success === false && responseData.error
          ? responseData.error.message
          : "An unexpected error occurred";
      throw new Error(errorMessage);
    }

    return responseData as ApiResponse<ChatHistoryData>;
  } catch (error) {
    console.error("Error getting the chat history: ", error);
    throw error;
  }
};
