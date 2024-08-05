const http = require('http');
const fs = require('fs');
const routes = require('./routes');


const requestHandler = (req, res) => {
  // console.log(req);
  // process.exit();
  // console.log(req.url, req.method, req.headers);

  if (req.url === '/') {
    res.write('<html>');
    res.write('<head><title>Node Server Form</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="msg"><button type="submit">Submit</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if (req.url === "/message" && req.method === "POST") {
    // fs.writeFileSync('message.txt', 'Dummy Data');
    // res.statusCode = 302;
    // res.setHeader('Location', '/');
    // OR
    // res.writeHead(302, { 'Location': '/' });
    // res.end();

    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    })

    // return req.on('end', () => {
    //   const parsedBody = Buffer.concat(body).toString();
    //   console.log(parsedBody);
    //   const message = parsedBody.split('=')[1];
    //   fs.writeFileSync('message.txt', message);
    //   res.statusCode = 302;
    //   res.setHeader('Location', '/');
    //   return res.end()
    // })

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      })
    })
  }

  res.setHeader('content-type', 'text/html')
  res.write('<html>');
  res.write('<head><title>Node Server</title></head>');
  res.write('<body><h1>Hello from Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
}

const server = http.createServer(requestHandler);
// OR
// http.createServer((req, res) => {});

// const serverr = http.createServer(routes.handler);
server.listen(3000);

// serverr.listen(5173);