export default function PixelPlant() {
  return (
    <svg
      className="pixel-bounce"
      width="150"
      height="150"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="30" y="60" width="40" height="30" fill="#E67E22" stroke="white" strokeWidth="3" />
      <rect x="25" y="55" width="50" height="10" fill="#D35400" stroke="white" strokeWidth="3" />
      <circle cx="50" cy="40" r="20" fill="#2ECC71" stroke="white" strokeWidth="3" />
      <circle cx="35" cy="30" r="10" fill="#2ECC71" stroke="white" strokeWidth="3" />
      <circle cx="65" cy="30" r="10" fill="#2ECC71" stroke="white" strokeWidth="3" />
      <circle cx="45" cy="40" r="2" fill="black" />
      <circle cx="55" cy="40" r="2" fill="black" />
      <path d="M45 45 Q50 50 55 45" stroke="black" strokeWidth="2" />
    </svg>
  );
}
