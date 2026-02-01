# Security & Privacy Posture (MVP)

## In Transit
- TLS enforced by hosting layer (HTTPS only).

## At Rest
- Database encryption handled by provider (or OS disk encryption for local).
- Media stored in private object storage (S3/R2) with signed URLs.

## Sensitive Data Handling
- Avoid logging request bodies for Moments/Vault.
- Redact `Authorization`, `text`, `note`, `caption`, and `url` fields in logs.

## Access Control
- All objects are scoped to `nestId`.
- “Me only” vault items hidden from partner (enforced server-side).

## Future Enhancements
- Field-level encryption for vault payloads.
- E2EE for messages/voice.
