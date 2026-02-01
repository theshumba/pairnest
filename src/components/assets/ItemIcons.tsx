export const PotionIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 20 V 40" stroke="white" strokeWidth="4"/>
    <path d="M50 40 L 30 90 H 70 L 50 40" fill="#FF00CC" stroke="white" strokeWidth="4"/>
    <circle cx="45" cy="70" r="3" fill="white" fillOpacity="0.5"/>
    <circle cx="55" cy="80" r="2" fill="white" fillOpacity="0.5"/>
  </svg>
);

export const GemIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 40 L 50 10 L 70 40 L 50 90 L 30 40" fill="#00FFFF" stroke="white" strokeWidth="4"/>
    <path d="M30 40 L 70 40" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
    <path d="M50 10 L 50 90" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
  </svg>
);
