import { useEffect, useState } from "react";

export const CyberMondayBanner = () => {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isCyberMonday, setIsCyberMonday] = useState(true);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    const cyberMondayEnd = new Date("2024-12-02T23:59:59").getTime();
    const launchOfferEnd = new Date("2024-12-08T23:59:59").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      let targetDate = isCyberMonday ? cyberMondayEnd : launchOfferEnd;
      const distance = targetDate - now;

      if (distance <= 0) {
        if (isCyberMonday) {
          // Passe à l'offre de lancement
          setIsCyberMonday(false);
        } else {
          // Cache la bannière si tout est terminé
          setIsBannerVisible(false);
          clearInterval(interval);
        }
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let timerString = "";
        if (days > 0) {
          timerString += `${days}j `;
        }
        timerString += `${hours}h ${minutes}m ${seconds}s`;

        setTimeRemaining(timerString);
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    // Mise à jour initiale
    updateCountdown();

    // Nettoyage de l'intervalle
    return () => clearInterval(interval);
  }, [isCyberMonday]);

  // Ne pas afficher la bannière si elle est masquée
  if (!isBannerVisible) {
    return null;
  }

  return (
    <div className="bg-black h-8 fixed z-50 top-2 w-full flex flex-col justify-center align-middle">
      <p className="text-center font-baloo text-white text-sm md:text-base">
        {isCyberMonday
          ? `Cyber Monday : profitez de `
          : `Offre de lancement : `}
        <span className="font-bold">-20%</span> sur tous nos jeux !{" "}
        {isCyberMonday
          ? `Offre valable encore ${timeRemaining}.`
          : `Profitez-en jusqu'à dimanche prochain : ${timeRemaining}.`}
      </p>
    </div>
  );
};
