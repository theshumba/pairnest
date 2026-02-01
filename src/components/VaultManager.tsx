"use client";

import { useEffect, useState } from "react";

interface Album {
  id: string;
  title: string;
  description?: string | null;
}

interface Milestone {
  id: string;
  title: string;
  date?: string | null;
}

export default function VaultManager() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const [milestoneTitle, setMilestoneTitle] = useState("");

  async function load() {
    const [albumsRes, milestonesRes] = await Promise.all([
      fetch("/api/vault/albums"),
      fetch("/api/vault/milestones"),
    ]);
    const albumsData = await albumsRes.json();
    const milestonesData = await milestonesRes.json();
    if (albumsRes.ok) setAlbums(albumsData.albums || []);
    if (milestonesRes.ok) setMilestones(milestonesData.milestones || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function createAlbum() {
    await fetch("/api/vault/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: albumTitle }),
    });
    setAlbumTitle("");
    load();
  }

  async function createMilestone() {
    await fetch("/api/vault/milestones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: milestoneTitle }),
    });
    setMilestoneTitle("");
    load();
  }

  return (
    <div className="section">
      <div className="card" style={{ padding: 16 }}>
        <h3>Albums</h3>
        <div className="inline-actions" style={{ marginTop: 8 }}>
          <input
            className="input"
            placeholder="New album title"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={createAlbum}>
            Create
          </button>
        </div>
        <div className="list" style={{ marginTop: 12 }}>
          {albums.length === 0 && <div className="subtle">No albums yet.</div>}
          {albums.map((album) => (
            <div key={album.id} className="card" style={{ padding: 10 }}>
              <div style={{ fontWeight: 600 }}>{album.title}</div>
              {album.description && <div className="subtle">{album.description}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <h3>Milestones</h3>
        <div className="inline-actions" style={{ marginTop: 8 }}>
          <input
            className="input"
            placeholder="New milestone"
            value={milestoneTitle}
            onChange={(e) => setMilestoneTitle(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={createMilestone}>
            Create
          </button>
        </div>
        <div className="list" style={{ marginTop: 12 }}>
          {milestones.length === 0 && (
            <div className="subtle">No milestones yet.</div>
          )}
          {milestones.map((ms) => (
            <div key={ms.id} className="card" style={{ padding: 10 }}>
              <div style={{ fontWeight: 600 }}>{ms.title}</div>
              {ms.date && (
                <div className="subtle">
                  {new Date(ms.date).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
