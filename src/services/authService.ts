import { ApiResponse } from "../utils/apiTypes";

interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupResponseData {
  username: string;
  email: string;
  password: string;
  _id: string;
}

interface LoginResponseData {
  token: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
}

/**
 * Handles the signup procces by sending credentials to the backend
 * @param credentials an object containing the username, email and password
 * @returns a promise ApiResponse that resolves or throw an error
 */
export const signupService = async (
  credentials: SignupCredentials,
): Promise<ApiResponse<SignupResponseData>> => {
  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const responseData: ApiResponse<SignupResponseData> = await response.json();
    if (!response.ok || !responseData.success) {
      const errorMessage =
        responseData.success === false && responseData.error
          ? responseData.error.message
          : "An unexpected error occurred";
      throw new Error(errorMessage);
    }

    return responseData as ApiResponse<SignupResponseData>;
  } catch (error) {
    console.error("Error during the signup: ", error);
    throw error;
  }
};

/**
 * Handles the login procces by sending credentials to the backend
 * @param credentials an object containing the email and password
 * @returns  a promise ApiResponse that resolves or throw an error
 */
export const loginService = async (
  credentials: LoginCredentials,
): Promise<ApiResponse<LoginResponseData>> => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const responseData: ApiResponse<LoginResponseData> = await response.json();
    if (!response.ok || !responseData.success) {
      const errorMessage =
        responseData.success === false && responseData.error
          ? responseData.error.message
          : "An unexpected error occurred";
      throw new Error(errorMessage);
    }

    return responseData as ApiResponse<LoginResponseData>;
  } catch (error) {
    console.error("Error during the login: ", error);
    throw error;
  }
};
