const fs = require('fs');

function ReqHandler(req, res) {
  if (req.url === '/') {
    res.write('<html>');
    res.write('<head><title>Node Server Form</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="msg"><button type="submit">Submit</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    })

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.writeHead(302, { 'Location': '/' });
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

exports.handler = ReqHandler;
exports.dummyText = 'Some Dummy Text';