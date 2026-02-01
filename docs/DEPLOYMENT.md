# Deployment Notes

## Environment Variables

### Web
- `BASE_URL` (used for magic links)
- `DEMO_MODE=true` for local demo

### Database
- `DATABASE_URL`

### Media (optional later)
- `S3_BUCKET`
- `S3_REGION`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`

## Run
- `npm run dev` for local
- `npm run build` then `npm run start` for production

## CORS
Handled by Next server in this app; if you split API later, add CORS rules.
