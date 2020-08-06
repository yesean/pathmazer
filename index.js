const express = require('express');
const path = require('path');
const app = express();

// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static('build'));

app.get('/', (req, res) => {
  console.log('user joined');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  console.log(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('server listening on PORT', PORT); });
