import SectionDivider from "./SectionDivider";

const TOASTMASTERS = [
  {
    name: "Förnamn Efternamn",
    role: "Toastmaster",
    image: "🤵",
    phone: "070-XXX XX XX",
    email: "toastmaster1@email.se",
    description:
      "En kort presentation av toastmastern. Relation till brudparet och kanske en rolig detalj.",
  },
  {
    name: "Förnamn Efternamn",
    role: "Toastmaster",
    image: "👩‍🎤",
    phone: "070-XXX XX XX",
    email: "toastmaster2@email.se",
    description:
      "En kort presentation av toastmastern. Relation till brudparet och kanske en rolig detalj.",
  },
];

const CONTACT_REASONS = [
  "Vill du hålla ett tal eller framföra en hyllning?",
  "Planerar du ett spex, en sketch eller ett musikaliskt inslag?",
  "Har du en idé till en aktivitet eller lek?",
  "Vill du samordna något med andra gäster?",
];

export default function ToastmasterSection() {
  return (
    <section id="toastmasters" className="toastmaster">
      <div className="toastmaster__inner">
        <p className="section-label">Era värdar för kvällen</p>
        <h2 className="section-title">Toastmasters</h2>

        <SectionDivider />

        <p className="toastmaster__intro">
          Våra fantastiska toastmasters ansvarar för underhållningen under
          kvällen. Kontakta dem om du vill bidra med tal, spex eller andra
          inslag — de samordnar allt så kvällen blir magisk!
        </p>

        {/* Toastmaster cards */}
        <div className="toastmaster__cards">
          {TOASTMASTERS.map((tm) => (
            <div key={tm.name} className="toastmaster__card">
              <div className="toastmaster__avatar">{tm.image}</div>
              <h3 className="toastmaster__name">{tm.name}</h3>
              <p className="toastmaster__role">{tm.role}</p>
              <p className="toastmaster__description">{tm.description}</p>
              <div className="toastmaster__contact">
                <a href={`tel:${tm.phone.replace(/[- ]/g, "")}`} className="toastmaster__link">
                  📱 {tm.phone}
                </a>
                <a href={`mailto:${tm.email}`} className="toastmaster__link">
                  ✉️ {tm.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* What to contact them for */}
        <div className="toastmaster__reasons">
          <h3 className="toastmaster__reasons-title">
            Kontakta toastmasters om du...
          </h3>
          <div className="toastmaster__reasons-list">
            {CONTACT_REASONS.map((reason, i) => (
              <div key={i} className="toastmaster__reason">
                <span className="toastmaster__reason-dot" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
          <p className="toastmaster__deadline">
            Meddela gärna senast <strong>1 juli 2026</strong> så att vi hinner
            planera kvällen.
          </p>
        </div>
      </div>
    </section>
  );
}