import { useState } from "react";
import LoginHeader from "./LoginHeader";
import LoginCard from "./LoginCard";
import SignupCard from "./SignupCard";
import AboutCard from "./AboutCard";

export default function LoginDashboard() {
  // useState to set the card to display
  const [card, setCard] = useState<string>("login");

  /**
   * Change the content based on the card name
   * @param cardName the name of the card to display
   */
  const toggleCard = (cardName: string) => {
    setCard(cardName);
  };

  return (
    <div className="min-h-screen bg-custom-beige flex flex-col">
      <div className="p-3">
        <LoginHeader toggleCard={toggleCard} card={card} />
      </div>
      <div className="p-3">
        {card === "login" && <LoginCard />}
        {card === "signup" && <SignupCard />}
        {card === "aboutus" && <AboutCard />}
      </div>
    </div>
  );
}
