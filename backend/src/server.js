import app from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { env } from './config/env.js';

let server;

async function startServer() {
  await connectDatabase();

  server = app.listen(env.port, () => {
    console.log(`Backend listening on http://localhost:${env.port}`);
  });
}

async function shutdown(signal) {
  console.log(`Received ${signal}. Closing backend...`);

  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  await disconnectDatabase();
  process.exit(0);
}

process.on('SIGINT', () => {
  shutdown('SIGINT').catch((error) => {
    console.error('Failed to shut down cleanly:', error.message);
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM').catch((error) => {
    console.error('Failed to shut down cleanly:', error.message);
    process.exit(1);
  });
});

startServer().catch((error) => {
  console.error('Backend failed to start:', error.message);
  process.exit(1);
});
