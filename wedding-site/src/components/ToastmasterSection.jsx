import SectionDivider from "./SectionDivider";

const TOASTMASTERS = [
  {
    name: "Christoffer Ivar",
    image: "🤵",
    phone: "070-XXX XX XX",
    email: "christoffer@email.se",
  },
  {
    name: "Rebecca Ivar",
    image: "👩‍🎤",
    phone: "070-XXX XX XX",
    email: "rebecca@email.se",
  },
];

const CONTACT_REASONS = [
  "Vill du hålla ett tal?",
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

        <div className="toastmaster__story">
          <p>
            Våra toastmasters är Rebecca och Christoffer Ivar – ett par som
            står oss väldigt nära.
          </p>
          <p>
            Vi lärde känna Rebecca och Christoffer i Göteborg när Rebecca var
            Jacks fadder under insparken på Göteborgs universitet 2018, och vi
            blev snabbt nära vänner. Vi inspireras mycket av dem och deras
            kärlek till varandra – en relation som rymmer allt vi själva hoppas
            få i vårt äktenskap: trygghet, omtanke, mycket skratt, en
            självklar kärlek och varandras bästa vänner.
          </p>
          <p>
            Med sin kvicka och naturliga humor skapar de alltid en avslappnad
            och glad stämning, precis det vi önskar för vår dag! Vi är så glada
            och tacksamma att just de kommer guida oss (och er!) genom middagen.
          </p>
        </div>

        {/* Toastmaster cards */}
        <div className="toastmaster__cards">
          {TOASTMASTERS.map((tm) => (
            <div key={tm.name} className="toastmaster__card">
              <div className="toastmaster__avatar">{tm.image}</div>
              <h3 className="toastmaster__name">{tm.name}</h3>
              <p className="toastmaster__role">Toastmaster</p>
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
            Meddela gärna senast <strong>1 juni 2026</strong> så att vi hinner
            planera kvällen.
          </p>
        </div>
      </div>
    </section>
  );
}