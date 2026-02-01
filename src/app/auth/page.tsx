import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="page">
      <div className="biome-bg" />
      <div className="ambient" />
      <main className="container" style={{ padding: "64px 0" }}>
        <div className="card" style={{ padding: 24, maxWidth: 520 }}>
          <h2 className="heading-serif" style={{ fontSize: 24 }}>
            Demo mode
          </h2>
          <p className="subtle">
            Email sign-in is disabled for now. Jump straight into the demo Nest
            to test everything.
          </p>
          <div className="inline-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-primary" href="/api/demo/start">
              Enter Demo Nest
            </Link>
            <Link className="btn btn-secondary" href="/">
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
