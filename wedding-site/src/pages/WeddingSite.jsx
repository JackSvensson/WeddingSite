import { useState, useEffect } from "react";
import { useCountdown } from "../hooks/useCountdown";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import StorySection from "../components/StorySection";
import GallerySection from "../components/GallerySection";
import InfoSection from "../components/InfoSection";
import RSVPSection from "../components/RSVPSection";
import ToastmasterSection from "../components/ToastmasterSection";
import Footer from "../components/Footer";
import FireworksOverlay from "../components/FireworksOverlay";

const WEDDING_DATE = "2026-08-29T15:00:00";
const SECTION_IDS = ["hem", "var-historia", "galleri", "information", "toastmasters", "osa"];

export default function WeddingSite() {
  const countdown = useCountdown(WEDDING_DATE);
  const [activeSection, setActiveSection] = useState("hem");
  const [showFireworks, setShowFireworks] = useState(() => {
    return sessionStorage.getItem("wedding_fireworks_seen") !== "true";
  });

  const handleFireworksComplete = () => {
    sessionStorage.setItem("wedding_fireworks_seen", "true");
    setShowFireworks(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {showFireworks && <FireworksOverlay onComplete={handleFireworksComplete} />}
      <Navigation activeSection={activeSection} />
      <HeroSection countdown={countdown} />
      <StorySection />
      <GallerySection />
      <InfoSection />
      <ToastmasterSection />
      <RSVPSection />
      <Footer />
    </>
  );
}