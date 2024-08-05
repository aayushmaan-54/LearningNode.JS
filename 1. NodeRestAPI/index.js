const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const MOCK_DATA = require('./MOCK_DATA.json');
const PORT = 3000;


const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const contentType = req.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
          // console.log("json bdy: ", body);
          resolve(JSON.parse(body));
          // console.log("json parsed bdy: ", JSON.parse(body));
        } else if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
          // console.log("form-urlencoded bdy: ", body);
          resolve(querystring.parse(body));
          // console.log("form-urlencoded parsd bdy: ", querystring.parse(body));
        } else {
          reject(new Error('Unsupported content type'));
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};


const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const parts = path.split('/').filter(part => part);
  const id = parts.length > 1 ? parts[1] : null;

  if (path === '/' && req.method === "GET") {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(MOCK_DATA));
  }

  else if (path.startsWith('/user/') && req.method === "GET" && id) {
    const user = MOCK_DATA.find(user => user.id === parseInt(id));
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'User not found' }));
    }
  }

  else if (path === '/user' && req.method === "POST") {
    try {
      const newUser = await parseBody(req);
      if (!newUser.first_name && !newUser.last_name && !newUser.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing required field' }));
        return;
      }
      newUser.id = MOCK_DATA.length + 1;
      MOCK_DATA.push(newUser);
      fs.writeFileSync('MOCK_DATA.json', JSON.stringify(MOCK_DATA));
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (error) {
      console.error('Error:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'An error occurred while processing the request' }));
    }
  }

  else if (path.startsWith('/user/') && req.method === "PATCH" && id) {
    try {
      const updateData = await parseBody(req);
      const userIndex = MOCK_DATA.findIndex(user => user.id === parseInt(id));
      if (userIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'User not found' }));
        return;
      }
      MOCK_DATA[userIndex] = { ...MOCK_DATA[userIndex], ...updateData };
      fs.writeFileSync('MOCK_DATA.json', JSON.stringify(MOCK_DATA));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(MOCK_DATA[userIndex]));
    } catch (error) {
      console.error('Error:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'An error occurred while processing the request' }));
    }
  }

  else if (path.startsWith('/user/') && req.method === "DELETE" && id) {
    const userIndex = MOCK_DATA.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'User not found' }));
      return;
    }
    const deletedUser = MOCK_DATA.splice(userIndex, 1)[0];
    fs.writeFileSync('MOCK_DATA.json', JSON.stringify(MOCK_DATA));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User deleted successfully', deletedUser }));
  }

  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});



server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});