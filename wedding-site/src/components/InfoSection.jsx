import SectionDivider from "./SectionDivider";

const INFO_CARDS = [
  {
    icon: "💒",
    title: "Vigsel",
    details: [
      "29 augusti 2026",
      "Vigseln startar kl. 14:00",
      "Slättens Loge",
    ],
  },
  {
    icon: "🥂",
    title: "Dagens Hållpunkter",
    details: [
      "Kl. 14:00 — Vigseln startar",
      "Kl. 14:30 — Mingel med bubbel & DAIM-tårta",
      "Kl. 17:30 — Asiatisk middag",
      "Kl. 22:00 — Baren öppnar & fest!",
    ],
  },
  {
    icon: "🏨",
    title: "Boende",
    details: [
      "Öijared Resort — ca 500m till fots",
      "Se hotellets hemsida för bokning",
      "Incheckning från kl. 15:00",
      "Receptionen bemannad till kl. 22:00",
    ],
  },
  {
    icon: "👔",
    title: "Klädkod",
    details: [
      "Sommarkavaj",
    ],
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

        {/* Extra info sections */}
        <div className="info__extra">
          <div className="info__extra-card">
            <h3 className="info__extra-title">🚗 Parkering</h3>
            <p className="info__extra-text">
              Parkering hittar ni vid Öijared Resort. Vi undanber parkering vid
              Slättens Loge. Det är ca 500m gång från parkeringen till lokalen.
            </p>
          </div>

          <div className="info__extra-card">
            <h3 className="info__extra-title">💌 Plus 1 & Barn</h3>
            <p className="info__extra-text">
              På grund av begränsat antal platser har vi tyvärr inte möjlighet
              att bjuda med +1 eller barn. Vi har valt att fira i ett mindre
              sällskap och bjuder därför endast de som står på inbjudan. Vi
              hoppas på er förståelse.
            </p>
          </div>

          <div className="info__extra-card">
            <h3 className="info__extra-title">🎁 Presenttips</h3>
            <p className="info__extra-text">
              Er närvaro på vår stora dag är den finaste presenten vi kan få ♥
              Vill ni ändå ge något så önskar vi oss ett bidrag till vår
              bröllopsresa till Sydkorea.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}