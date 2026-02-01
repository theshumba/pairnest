import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="page">
      <div className="biome-bg" />
      <div className="ambient" />
      <main className="container" style={{ padding: "64px 0" }}>
        <div className="card" style={{ padding: 24 }}>
          <h2 className="heading-serif" style={{ fontSize: 26 }}>
            This is your shared space.
          </h2>
          <p className="subtle">
            Nothing here is public. You can move at your own pace.
          </p>
          <div className="section">
            <Link className="btn btn-primary" href="/play">
              Start something light
            </Link>
            <Link className="btn btn-secondary" href="/nest">
              Choose a biome
            </Link>
            <Link className="btn btn-ghost" href="/home">
              Explore quietly
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
