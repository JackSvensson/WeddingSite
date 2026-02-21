export default function LeafDecoration({ style }) {
    return (
      <svg
        width="120"
        height="60"
        viewBox="0 0 120 60"
        fill="none"
        className="leaf-decoration"
        style={style}
      >
        <path
          d="M10 50 Q30 10 60 30 Q90 10 110 50"
          stroke="#5c7c5a"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M20 50 Q40 20 60 35 Q80 20 100 50"
          stroke="#8ba888"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="60" cy="32" r="3" fill="#c4a35a" opacity="0.4" />
      </svg>
    );
  }