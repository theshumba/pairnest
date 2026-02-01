import Image from "next/image";

const PREVIEWS = [
  {
    title: "Play together",
    description: "Light, low-pressure games designed for two.",
    icon: "/assets/icons/cloud.svg",
  },
  {
    title: "Share moments",
    description: "Check-ins, thoughts, and tiny rituals — optional always.",
    icon: "/assets/icons/leaf.svg",
  },
  {
    title: "Private vault",
    description: "A calm archive of photos, notes, and keepsakes.",
    icon: "/assets/icons/lock.svg",
  },
];

export default function HeroPreview() {
  return (
    <div className="grid-2" style={{ marginTop: 32 }}>
      {PREVIEWS.map((item) => (
        <div key={item.title} className="card" style={{ padding: 16 }}>
          <Image src={item.icon} alt="" width={24} height={24} />
          <div style={{ fontWeight: 600, marginTop: 8 }}>{item.title}</div>
          <p className="subtle" style={{ marginTop: 6 }}>
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
