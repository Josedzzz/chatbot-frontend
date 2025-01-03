// define the type for the component props
type LoginHeaderProps = {
  toggleCard: (cardName: string) => void;
  card: string;
};

export default function LoginHeader({ toggleCard, card }: LoginHeaderProps) {
  /**
   * depends on the link selected give to the element different styles
   * @param link the selected cardName
   * @returns the tailwind classes to be added
   */
  const linkClasses = (link: string) =>
    `hover:text-custom-black hover:scale-105 text-sm sm:text-md md:text-lg transition duration-300 ease-in-out font-bold ${
      card === link
        ? "border-b-2 border-custom-black text-custom-black"
        : "text-custom-black hover:text-custom-black"
    }`;

  return (
    <header className="h-16 w-full rounded-xl bg-custom-white border-4 border-custom-black flex justify-between items-center p-2 sm:px-14 animate-slideIn">
      <div className="flex items-center space-x-1 gap-3">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-custom-black">
          Joki Chat
        </h1>
        <i className="fa-solid fa-robot text-xl sm:text-3xl md:text-4xl text-custom-black"></i>
      </div>

      {/* Navigation links with horizontal scroll on small screens */}
      <nav className="flex overflow-x-auto space-x-4 sm:space-x-8">
        <a
          onClick={() => toggleCard("aboutus")}
          className={linkClasses("aboutus")}
        >
          About us
        </a>
        <a
          onClick={() => toggleCard("signup")}
          className={linkClasses("signup")}
        >
          Sign up
        </a>
        <a onClick={() => toggleCard("login")} className={linkClasses("login")}>
          Login
        </a>
        <a
          href="https://github.com/Josedzzz/chatbot-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses("github")}
        >
          <i className="fa-brands fa-github text-custom-black"></i>
        </a>
      </nav>
    </header>
  );
}
