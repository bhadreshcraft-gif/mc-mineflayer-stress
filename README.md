# mc-mineflayer-stress

Simple Mineflayer multi-bot stress tester / starter project.

> ⚠️ Use only on servers you own or have explicit permission to test.

## Features
- Spawn multiple Mineflayer bots (default 10, configurable).
- Minimal behavior to reduce client CPU: connect and optionally respond to chat.
- Auto-reconnect with backoff.
- Ready for Replit or any Node.js host.

## Files
- `index.js` — main bot script
- `package.json` — dependencies & start script

## Usage

### Environment variables
Set these in your environment (Replit Secrets or local `.env`):
- `SERVER_HOST` — server domain or numeric IP (required)
- `SERVER_PORT` — server port (default `25565`)
- `BOT_COUNT` — number of bots to spawn (default `10`)
- `JOIN_DELAY_MS` — ms between bot joins (recommended `2000` for large counts)

### Run locally
```bash
npm install
export SERVER_HOST=your.server.ip.or.domain
export BOT_COUNT=50
export JOIN_DELAY_MS=2000
npm start
