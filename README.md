# Pairnest

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4-010101?logo=socket.io)

A real-time social app for couples — part digital scrapbook, part playground, part shared living space. Couples create a private "nest" and fill it with memories, games, daily rituals, and a virtual plant they grow together through consistent interaction.

## Features

**Nest** — A shared private space with customizable biomes, growth stages, and a virtual plant that evolves as you interact together.

**Vault** — Private photo and media albums with per-item visibility controls (both, one, or hidden). Organized into albums with S3-backed uploads via presigned URLs.

**Moments** — Daily check-ins, shared journal entries, a "together" presence mode, and a thought stream. Each interaction earns growth credits toward your nest.

**Play** — Real-time multiplayer mini-games over WebSockets: Tic Tac Toe, Sync Tap, and Coincide. Turn-based with full game session tracking.

**Memories** — A timeline of photos, notes, and keepsakes. Tag items as sensitive or mark them as keepsakes to pin.

**Milestones** — Track relationship milestones and link them to specific memories.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + custom "Plastic UI" design tokens |
| Animation | Framer Motion |
| State | Zustand |
| Database | Prisma 5 (SQLite dev / Postgres prod) |
| Auth | Supabase Auth + magic link flow |
| Real-time | Socket.IO (custom Node.js server) |
| Storage | AWS S3 (presigned uploads) |
| Email | Resend |
| Validation | Zod 4 |

## Architecture

The app runs on a custom Node.js HTTP server that wraps Next.js and Socket.IO on the same port. The `/nest` Socket.IO namespace handles:

- Presence (online/offline status per nest)
- Game turns and actions
- Moment creation broadcasts
- Typing indicators
- "Together" heartbeat sessions
- Sync tap coordination

## Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed demo data (optional)
npm run db:seed

# Start dev server
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    api/         # REST endpoints (auth, game, memory, nest, vault, etc.)
    demo/        # Demo mode entry
    home/        # Authenticated dashboard
    memories/    # Memory timeline
    moments/     # Check-ins, journal, together mode
    nest/        # Nest dashboard + plant care
    play/        # Mini-games (tic tac toe, sync tap, coincide)
    settings/    # Nest settings
    vault/       # Private media vault + albums
    vibe/        # Vibe/mood tracker
  components/    # Shared UI (AppShell, BottomNav, BiomeBackground, etc.)
  lib/           # Utilities and helpers
prisma/
  schema.prisma  # 14 models (User, Nest, Memory, GameSession, VaultItem, etc.)
docs/            # QA checklist, security posture, deployment guide
```

## License

Private repository.
