const express = require('express');
const redis = require('redis');
const app = express();
const port = process.env.PORT || 3000;

// Connexion Redis (pour démonstration)
const redisClient = redis.createClient({ url: 'redis://redis:6379' });
redisClient.connect().catch(console.error);

app.get('/play', async (req, res) => {
  // Incrémente un compteur de parties jouées
  const plays = await redisClient.incr('plays');
  res.json({ service: "game", plays });
});

app.get('/status', (req, res) => {
  res.json({ service: "game", status: "ok" });
});

app.listen(port, () => {
  console.log(`Game Service running on port ${port}`);
});
