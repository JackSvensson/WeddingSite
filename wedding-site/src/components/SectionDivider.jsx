export default function SectionDivider() {
    return (
      <div className="divider">
        <svg width="200" height="30" viewBox="0 0 200 30" fill="none">
          <line x1="0" y1="15" x2="80" y2="15" stroke="#b7cdb3" strokeWidth="0.5" />
          <path
            d="M90 5 Q95 15 100 5 Q105 15 110 5"
            stroke="#c4a35a"
            strokeWidth="1.2"
            fill="none"
          />
          <line x1="120" y1="15" x2="200" y2="15" stroke="#b7cdb3" strokeWidth="0.5" />
        </svg>
      </div>
    );
  }