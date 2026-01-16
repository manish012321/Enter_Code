import express from 'express';
import cors from 'cors';
import { serve } from 'inngest/express';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import { inngest, functions } from './lib/Inngest.js';

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "https://enter-code-zeta.vercel.app",
    /\.vercel\.app$/
  ],
  credentials: true
}));


app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/', (req, res) => {
  res.json({ msg: 'Server is running' });
});

app.get('/books', (req, res) => {
  res.json({ msg: 'Books endpoint' });
});

const PORT = ENV.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();