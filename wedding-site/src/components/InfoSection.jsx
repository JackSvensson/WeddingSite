import SectionDivider from "./SectionDivider";

const INFO_CARDS = [
  {
    icon: "🕐",
    title: "Ceremoni",
    details: ["29 augusti 2026", "Kl. 15:00", "Plats för ceremoni"],
  },
  {
    icon: "🥂",
    title: "Fest & Middag",
    details: ["29 augusti 2026", "Kl. 17:00", "Plats för festen"],
  },
  {
    icon: "🏨",
    title: "Boende",
    details: ["Hotellförslag för gäster", "Avstånd till festlokal", "Bokningsinfo"],
  },
  {
    icon: "👗",
    title: "Klädkod",
    details: ["Klädkod här", "Tips och rekommendationer"],
  },
];

export default function InfoSection() {
  return (
    <section id="information" className="info">
      <div className="info__inner">
        <p className="section-label">Allt ni behöver veta</p>
        <h2 className="section-title">Praktisk Information</h2>

        <SectionDivider />

        <div className="info__grid">
          {INFO_CARDS.map((card) => (
            <div key={card.title} className="info__card">
              <div className="info__card-icon">{card.icon}</div>
              <h3 className="info__card-title">{card.title}</h3>
              {card.details.map((detail, i) => (
                <p key={i} className="info__card-detail">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}