const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve static files from the 'web' directory
app.use(express.static('web'));

// Default route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});