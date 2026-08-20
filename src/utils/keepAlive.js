const cron = require('node-cron');

/**
 * Keep-alive cron job — pings /api/ping every 14 minutes.
 * Only runs in non-production (local/traditional server).
 * On Vercel, use the Vercel Cron Job in vercel.json instead.
 */
const startKeepAlive = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('[keep-alive] Skipping node-cron in production (use Vercel Cron Jobs)');
    return;
  }

  const serverUrl = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 3000}`;

  // Run every 14 minutes: "*/14 * * * *"
  cron.schedule('*/14 * * * *', async () => {
    try {
      const res = await fetch(`${serverUrl}/api/ping`);
      const data = await res.json();
      console.log(`[keep-alive] Ping OK — ${data.timestamp}`);
    } catch (error) {
      console.error(`[keep-alive] Ping failed — ${error.message}`);
    }
  });

  console.log(`[keep-alive] Cron started — pinging ${serverUrl}/api/ping every 14 minutes`);
};

module.exports = startKeepAlive;
