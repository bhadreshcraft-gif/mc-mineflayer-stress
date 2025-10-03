// index.js - minimal multi-bot starter (safe defaults for many bots)
const mineflayer = require('mineflayer');

const HOST = process.env.SERVER_HOST || '';
const PORT = parseInt(process.env.SERVER_PORT || '25565', 10);
const COUNT = Math.min(parseInt(process.env.BOT_COUNT || '10', 10), 500); // safety cap
const JOIN_DELAY_MS = parseInt(process.env.JOIN_DELAY_MS || '2000', 10);

if (!HOST) {
  console.error('ERROR: SERVER_HOST environment variable not set.');
  process.exit(1);
}

console.log(`Spawning ${COUNT} bots -> ${HOST}:${PORT} (join delay ${JOIN_DELAY_MS}ms)`);

function createBot(i) {
  const username = `TestBot_${i}_${Math.floor(Math.random() * 10000)}`;
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username,
    timeout: 15000
    // NOTE: add auth options here if you need Microsoft auth
  });

  bot.once('spawn', () => {
    console.log(`[${username}] spawned`);
  });

  bot.on('kicked', (reason) => {
    console.log(`[${username}] kicked: ${reason}`);
  });

  bot.on('error', (err) => {
    console.log(`[${username}] error:`, err && err.message ? err.message : err);
  });

  bot.on('end', () => {
    console.log(`[${username}] disconnected`);
    // reconnect after a random backoff to avoid thundering herd
    setTimeout(() => {
      console.log(`[${username}] reconnecting...`);
      createBot(i);
    }, 15000 + Math.floor(Math.random() * 30000));
  });
}

for (let i = 0; i < COUNT; i++) {
  setTimeout(() => createBot(i), i * JOIN_DELAY_MS);
}
