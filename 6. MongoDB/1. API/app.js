const express = require('express');
const server = express();
const PORT = 3000;

server.get('/', (req, res) => {
  res.send({ message: 'hello, world!' })
})

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});