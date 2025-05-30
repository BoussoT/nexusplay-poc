const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Exemple : récupération d’un secret
const secret = process.env.USER_SECRET || "no-secret";

app.get('/status', (req, res) => {
  res.json({ service: "user", status: "ok", secret: secret });
});

app.listen(port, () => {
  console.log(`User Service running on port ${port}`);
});
