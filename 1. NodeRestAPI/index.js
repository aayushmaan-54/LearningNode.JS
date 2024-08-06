const http = require('http');
const url = require('url');
const { routeHandler, loggerMiddleware } = require('./router');
const PORT = 3000;


const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const parts = path.split('/').filter(part => part);
  const id = parts.length > 1 ? parts[1] : null;

  loggerMiddleware(req, res, () => {
    routeHandler(req, res, path, id);
  })
});



server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});