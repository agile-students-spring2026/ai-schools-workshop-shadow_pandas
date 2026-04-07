// src/server.js
import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.error("Server failed to start:", err.message);
}

// Catch all unhandled errors
process.on('uncaughtException', (err) => console.error('Uncaught Exception:', err));
process.on('unhandledRejection', (err) => console.error('Unhandled Rejection:', err));