export default function AboutCard() {
  return (
    <main className="flex items-center justify-center w-full">
      <div className="w-full max-w-xl bg-custom-white p-8 border-4 border-custom-black rounded-xl">
        <div className="flex items-center space-x-1 gap-1 mb-5">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-custom-black">
            About us
          </h1>
          <i className="fa-solid fa-users text-xl sm:text-3xl md:text-4xl text-custom-black"></i>
        </div>
        <p className="text-base text-custom-dark mb-4 text-justify">
          Joki Chat is a personal project built to experiment with the Gemini
          API. It's a simple chatbot designed to showcase how the API can be
          used for conversational purposes.
        </p>
        <p className="text-base text-custom-dark text-justify">
          This app is a straightforward way to explore the basics of working
          with AI-powered chatbots.
        </p>
      </div>
    </main>
  );
}
