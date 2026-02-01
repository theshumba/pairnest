# Media Upload Strategy (MVP)

## Current MVP
- Vault uses URL stubs only.
- `/api/memory/upload-url` returns a placeholder in demo mode.

## Production Plan (S3/R2)
- `POST /media/presign` returns a signed PUT URL + object key.
- Client uploads directly to storage.
- Store object key + metadata in `MediaObject` and `VaultItem`.
- Use signed GET URLs for downloads.

## Notes
- Keep URLs short-lived (60s).
- Use private ACLs.
- Never store raw URLs in public logs.
