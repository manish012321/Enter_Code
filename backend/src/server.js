import express from 'express';
import cors from 'cors';
import { serve } from 'inngest/express';
import { ENV } from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import { inngest , functions } from './lib/Inngest.js';



const app = express();
const __dirname = path.resolve();

app.use(express.json());

// CORS fix
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));

// Correct URL + ensure functions are passed
app.use("/api/inngest", serve({ client: inngest, functions }));

// Test routes
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Server is running' });
});

app.get('/books', (req, res) => {
  res.status(200).json({ msg: 'Books endpoint' });
});

// Production setup
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

const PORT = ENV.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
