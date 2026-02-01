"use client";

import { useState } from "react";

export default function VaultUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function upload() {
    if (!file) return;
    setStatus("Requesting upload...");

    const res = await fetch("/api/memory/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, mime: file.type }),
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error || "Upload failed");
      return;
    }

    const formData = new FormData();
    Object.entries(data.fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("file", file);

    setStatus("Uploading...");
    const uploadRes = await fetch(data.url, {
      method: "POST",
      body: formData,
    });

    if (!uploadRes.ok) {
      setStatus("Upload failed");
      return;
    }

    await fetch("/api/memory/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: file.type.startsWith("image/") ? "photo" : "video",
        url: data.assetKey,
      }),
    });

    setStatus("Uploaded");
    setFile(null);
  }

  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 600 }}>Upload memory</div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <div className="inline-actions" style={{ marginTop: 8 }}>
        <button className="btn btn-secondary" onClick={upload}>
          Upload
        </button>
        {status && <span className="subtle">{status}</span>}
      </div>
    </div>
  );
}
