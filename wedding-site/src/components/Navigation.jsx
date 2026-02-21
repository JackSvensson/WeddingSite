const NAV_LINKS = [
    { id: "hem", label: "Hem" },
    { id: "var-historia", label: "Vår Historia" },
    { id: "galleri", label: "Galleri" },
    { id: "information", label: "Information" },
    { id: "toastmasters", label: "Toastmasters" },
    { id: "osa", label: "OSA" },
  ];
  
  export default function Navigation({ activeSection }) {
    const scrollTo = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
  
    return (
      <nav className="nav">
        <div className="nav__inner">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`nav__link ${activeSection === link.id ? "nav__link--active" : ""}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>
    );
  }