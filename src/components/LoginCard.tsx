import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authService";
import Cookies from "js-cookie";

export default function LoginCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Validates the email and password
   * @returns null if is good, otherwise return a message
   */
  const validateForm = (): string | null => {
    if (!/\S+@\S+\.\S+/.test(email)) return "Email is not valid";
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    return null;
  };

  /**
   * Handles the submission for the login event
   * @param e the form submission event
   */
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(false);
    try {
      const validationMessage = validateForm();
      if (validationMessage) {
        setMessage(validationMessage);
        return;
      }
      const response = await loginService({ email, password });
      if (response.success) {
        setMessage(response.message);
        localStorage.setItem("userId", response.data.user._id);
        Cookies.set("authToken", response.data.token, { expires: 1 });
        navigate("/user-dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error ocurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center w-full">
      <div className="w-full max-w-xl bg-custom-white p-8 border-4 border-custom-black rounded-xl animate-fadeInScale">
        <div className="flex items-center space-x-1 gap-1 mb-5">
          <h1 className="text-xl font-bold text-custom-black">Login</h1>
          <i className="fa-solid fa-arrow-right-to-bracket text-xl text-custom-black"></i>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-5">
            <label
              className="block text-custom-black font-bold mb-3"
              htmlFor="email"
            >
              <i className="fa-solid fa-envelope"></i> Email
            </label>
            <input
              type="email"
              id="email"
              className="text-custom-black w-full px-2 py-1 rounded-lg ring-2 ring-custom-black focus:outline-none focus:ring-4 focus:ring-custom-black text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="block text-custom-black font-bold mb-3"
              htmlFor="password"
            >
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              className="text-custom-black w-full px-2 py-1 rounded-lg ring-2 ring-custom-black focus:outline-none focus:ring-4 focus:ring-custom-black text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-white text-custom-black font-bold p-2 border-2 border-custom-black rounded-xl w-full ${
                isLoading
                  ? "bg-custom-black text-custom-white cursor-not-allowed"
                  : "hover:bg-custom-black hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
              }`}
            >
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
            </button>
          </div>
        </form>
        {message && (
          <p className="text-custom-black text-center mt-4">{message}</p>
        )}
      </div>
    </main>
  );
}
