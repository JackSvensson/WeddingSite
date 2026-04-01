import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

/*
 * ─── ÄNDRA DESSA FÖR ATT SÄTTA DITT LÖSENORD ───
 * Byt ut användarnamn och lösenord nedan.
 * För en produktionssajt bör detta hanteras via en backend,
 * men för en enkel bröllopshemsida funkar detta utmärkt.
 */
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "brollop2026";

// ─── Login Screen ───
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("wedding_admin_auth", "true");
      onLogin();
    } else {
      setError("Fel användarnamn eller lösenord");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="admin-login">
      <div
        className={`admin-login__card ${shaking ? "admin-login__card--shake" : ""}`}
      >
        <div className="admin-login__header">
          <p className="section-label">Bröllopsadmin</p>
          <h1 className="admin-login__title">Logga in</h1>
        </div>

        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="rsvp__field">
            <label className="rsvp__label">Användarnamn</label>
            <input
              type="text"
              className="rsvp__input"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Användarnamn"
              autoComplete="username"
            />
          </div>

          <div className="rsvp__field">
            <label className="rsvp__label">Lösenord</label>
            <input
              type="password"
              className="rsvp__input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Lösenord"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="admin-login__error">{error}</p>}

          <button type="submit" className="rsvp__submit">
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── RSVP Entry Card ───
function RSVPEntry({ rsvp }) {
  const isAttending = rsvp.attending === "ja";

  return (
    <div className={`rsvp-entry ${isAttending ? "rsvp-entry--attending" : "rsvp-entry--declined"}`}>
      <div className="rsvp-entry__header">
        <span className="rsvp-entry__name">{rsvp.name}</span>
        <span
          className={`rsvp-entry__badge ${
            isAttending ? "rsvp-entry__badge--attending" : "rsvp-entry__badge--declined"
          }`}
        >
          {isAttending ? "Kommer" : "Kan inte"}
        </span>
      </div>
      <div className="rsvp-entry__details">
        {rsvp.dietary && <div>🍽️ {rsvp.dietary}</div>}
        {rsvp.message && <div className="rsvp-entry__message">"{rsvp.message}"</div>}
        {rsvp.submittedAt && (
          <div className="rsvp-entry__date">
            🕐 {new Date(rsvp.submittedAt).toLocaleDateString("sv-SE", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Dashboard ───
function AdminDashboard() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const loadRsvps = async () => {
      try {
        const q = query(collection(db, "rsvps"), orderBy("submittedAt", "desc"));
        const snapshot = await getDocs(q);
        const entries = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            submittedAt: data.submittedAt?.toDate?.()?.toISOString() || null,
          };
        });
        setRsvps(entries);
      } catch (err) {
        console.error("Failed to load RSVPs:", err);
      }
      setLoading(false);
    };

    loadRsvps();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("wedding_admin_auth");
    navigate("/admin");
    window.location.reload();
  };

  const attending = rsvps.filter((r) => r.attending === "ja");
  const declined = rsvps.filter((r) => r.attending === "nej");

  const dietaryList = attending
    .filter((r) => r.dietary)
    .map((r) => ({ name: r.name, dietary: r.dietary }));

  const filteredRsvps =
    filter === "all"
      ? rsvps
      : filter === "attending"
      ? attending
      : declined;

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-dashboard__header">
        <div className="admin-dashboard__header-inner">
          <div>
            <h1 className="admin-dashboard__title">OSA Dashboard</h1>
            <p className="admin-dashboard__subtitle">Förnamn & Förnamn — 29 augusti 2026</p>
          </div>
          <div className="admin-dashboard__actions">
            <button
              className="admin-dashboard__link"
              onClick={() => navigate("/")}
            >
              ← Tillbaka till sidan
            </button>
            <button
              className="admin-dashboard__logout"
              onClick={handleLogout}
            >
              Logga ut
            </button>
          </div>
        </div>
      </header>

      <div className="admin-dashboard__content">
        {/* Stats row */}
        <div className="admin-dashboard__stats">
          {[
            { label: "Totalt svar", value: rsvps.length, color: "var(--sage)" },
            { label: "Kommer", value: attending.length, color: "#5a9e5a" },
            { label: "Kan inte", value: declined.length, color: "#c47a7a" },
          ].map((stat) => (
            <div key={stat.label} className="admin-stat-card">
              <div className="admin-stat-card__value" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="admin-stat-card__label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Two-column: dietary + songs */}
        {dietaryList.length > 0 && (
          <div className="admin-dashboard__columns">
            <div className="admin-info-card">
              <h3 className="admin-info-card__title">🍽️ Allergier & Specialkost</h3>
              <ul className="admin-info-card__list">
                {dietaryList.map((item, i) => (
                  <li key={i}>
                    <strong>{item.name}:</strong> {item.dietary}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="admin-dashboard__filter">
          <h2 className="admin-dashboard__section-title">Alla svar</h2>
          <div className="admin-dashboard__tabs">
            {[
              { key: "all", label: `Alla (${rsvps.length})` },
              { key: "attending", label: `Kommer (${attending.length})` },
              { key: "declined", label: `Kan inte (${declined.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`admin-dashboard__tab ${
                  filter === tab.key ? "admin-dashboard__tab--active" : ""
                }`}
                onClick={() => setFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* RSVP list */}
        {loading ? (
          <p className="admin-panel__empty">Laddar svar...</p>
        ) : filteredRsvps.length === 0 ? (
          <div className="admin-dashboard__empty">
            <div className="admin-dashboard__empty-icon">📭</div>
            <p className="admin-panel__empty">
              {rsvps.length === 0
                ? "Inga OSA-svar har kommit in ännu. De dyker upp här så fort gäster svarar!"
                : "Inga svar matchar filtret."}
            </p>
          </div>
        ) : (
          <div className="admin-panel__list">
            {filteredRsvps.map((rsvp, i) => (
              <RSVPEntry key={i} rsvp={rsvp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Page (login gate) ───
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("wedding_admin_auth") === "true"
  );

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard />;
}