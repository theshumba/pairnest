# Pairnest QA Checklist (MVP)

## Auth
- Magic link request succeeds
- Verify link creates session and sets cookie
- Refresh keeps session
- Sign out clears session

## Nest
- Create nest generates invite code
- Join nest with valid code works
- Code expires/used behavior
- Biome applies in UI
- Comfort controls save/load
- Shelf pin appears on Home

## Moments
- Check-in creates moment
- Thought drop creates moment
- Together start + end creates moments
- List shows newest first
- Typing indicator only shows partner

## Vault
- Create album
- Add item to album
- Add item without album
- “Me only” items hidden from partner
- Pinned album shows in Home shelf

## Plant
- Choose plant works
- Water once per day per user
- Second water returns already
- Both watered increments streak
- Missed day resets streak

## Realtime
- Socket connects and reconnects
- Presence updates in Home
- Sync tap updates across tabs
- Coincide game syncs choices
