import LeafDecoration from "./LeafDecoration";

const COUNTDOWN_UNITS = [
  { key: "days", label: "Dagar" },
  { key: "hours", label: "Timmar" },
  { key: "minutes", label: "Minuter" },
  { key: "seconds", label: "Sekunder" },
];

export default function HeroSection({ countdown }) {
  return (
    <section id="hem" className="hero">
      <div className="hero__texture" />

      <LeafDecoration
        style={{ position: "absolute", top: "15%", left: "5%", transform: "rotate(-20deg)" }}
      />
      <LeafDecoration
        style={{ position: "absolute", bottom: "20%", right: "5%", transform: "rotate(15deg)" }}
      />

      <p className="hero__subtitle">Vi gifter oss</p>

      <h1 className="hero__names">
        Jack <span>&</span> Anne
      </h1>

      <p className="hero__date">29 AUGUSTI 2026</p>

      <div className="countdown">
        {COUNTDOWN_UNITS.map(({ key, label }) => (
          <div key={key} className="countdown__unit">
            <div className="countdown__number">
              {String(countdown[key] ?? 0).padStart(2, "0")}
            </div>
            <div className="countdown__label">{label}</div>
          </div>
        ))}
      </div>

      <div className="hero__scroll">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="#b7cdb3"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}