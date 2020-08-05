const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  console.log('user joined');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  console.log(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => { console.log('server listening on PORT', PORT); });
