const fs = require('fs');
const MOCK_DATA = require('./MOCK_DATA.json');
const querystring = require('querystring');


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


const routeHandler = async (req, res, path, id) => {
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
}


const loggerMiddleware = (req, res, next) => {
  const ip = req.socket.remoteAddress;
  const method = req.method;
  const timestamp = Date.now();
  fs.appendFileSync('./log.txt', `${timestamp}  ${ip}  ${method}\n`);
  next();
}


module.exports = {
  routeHandler,
  loggerMiddleware
}