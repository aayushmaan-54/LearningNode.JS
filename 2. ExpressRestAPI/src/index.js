const express = require('express');
const MOCK_DATA = require('../MOCK_DATA.json');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log("Hello from logging middleware");
  req.UserName = "aayushmaan";
  fs.appendFile('log.txt', `${Date.now()} : ${req.ip} - ${req.method} : ${req.path} \n`, (err) => {
    if (err) console.error('Error writing to log file:', err);
    next();
  });
});


// Routes
app.get('/', (req, res) => {
  const htmlRes = `
    <ul>
      <li><a href="/users">User Data</a></li>
    </ul>
  `;
  res.send(htmlRes);
});

app.get('/users', (req, res) => {
  const htmlRes = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Node REST Hybrid API Server</title>
    </head>
    <body class="font-sans bg-gray-100 overflow-x-hidden">
      <ul class="space-y-4 pt-4 px-2">
          <li class="flex items-center space-x-4 p-4 w-screen">
            <a href="/api/users" class="text-blue-500 underline hover:text-blue-700 text-2xl font-bold w-full text-center">GET: UserData API</a>
          </li>

          <li class="flex items-center space-x-4 pb-4 w-screen">
            <a href="/api/user/1" class="text-blue-500 underline hover:text-blue-700 text-2xl font-bold mx-auto text-center w-full">GET: UserInfo API</a>
          </li>

          <li class="flex items-center space-x-4 pb-4 w-screen">
            <code class="flex flex-col items-center justify-center">
              <span>POST: /api/user</span>
              <span class="w-screen text-center">body: {
                first_name: "John"
                last_name: "Doe",
                email: "john.doe@email.com"
                address: "125 main st."
              }</span>
            </code>
          </li>

          <li class="flex items-center space-x-4 pb-4 w-screen">
            <code class="flex flex-col items-center justify-center">
              <span>PATCH: /api/user/:userID</span>
              <span class="w-screen text-center">body: {
                email: "john.doe@gmail.com"
              }</span>
            </code>
          </li>

          <li class="flex items-center space-x-4 pb-4 w-screen">
            <code class="flex flex-col items-center justify-center">
              <span class="w-screen text-center">DELETE: /api/user/:userID</span>
            </code>
          </li>
        </ul>
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-3xl font-bold mb-6 text-center">User Information</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${MOCK_DATA.map(user => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-6">
                  <h2 class="text-xl font-semibold mb-2">${user.first_name} ${user.last_name}</h2>
                  <p class="text-gray-600 mb-1">ID: ${user.id}</p>
                  <p class="text-gray-600 mb-1">Email: ${user.email}</p>
                <p class="text-gray-600">Address: ${user.address}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      </body>
    </html>
  `;
  res.send(htmlRes);
});


// REST API
app.get('/api/users', (req, res) => {
  res.json(MOCK_DATA);
});


app.route('/api/user/:userID')
  .get((req, res) => {
    const id = Number(req.params.userID);
    const user = MOCK_DATA.find(user => user.id === id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  })

  .patch((req, res) => {
    const id = Number(req.params.userID);

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'No data provided for update' });
    }
    const userIndex = MOCK_DATA.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      MOCK_DATA[userIndex] = { ...MOCK_DATA[userIndex], ...req.body };
      fs.writeFile(path.join(__dirname, '../MOCK_DATA.json'),
        JSON.stringify(MOCK_DATA), (err) => {
          if (err) {
            console.error('Error writing to MOCK_DATA.json:', err);
            res.status(500).json({ status: 'error', message: 'Failed to update user' });
          } else {
            res.json({ status: 'success', id: id });
          }
        });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  })

  .delete((req, res) => {
    const id = Number(req.params.userID);
    const userIndex = MOCK_DATA.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      MOCK_DATA.splice(userIndex, 1);
      fs.writeFile(path.join(__dirname, '../MOCK_DATA.json'), JSON.stringify(MOCK_DATA), (err) => {
        if (err) {
          console.error('Error deleting to MOCK_DATA.json:', err);
          res.status(500).json({ status: 'error', message: 'Failed to delete user' });
        } else {
          res.json({ status: 'success', id: id });
        }
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });


app.post('/api/user', (req, res) => {
  const { first_name, last_name, email, address } = req.body;
  const missingFields = [];
  if (!first_name) missingFields.push('first_name');
  if (!last_name) missingFields.push('last_name');
  if (!email) missingFields.push('email');
  if (!address) missingFields.push('address');

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  const newUser = { first_name, last_name, email, address, id: MOCK_DATA.length + 1 };
  MOCK_DATA.push(newUser);

  fs.writeFile(path.join(__dirname, '../MOCK_DATA.json'), JSON.stringify(MOCK_DATA), (err) => {
    if (err) {
      console.error('Error writing to MOCK_DATA.json:', err);
      res.status(500).json({ status: 'error', message: 'Failed to save user' });
    } else {
      res.json({ status: 'success', id: newUser.id });
    }
  });
})


app.listen(PORT, () => {
  console.log("Server started at PORT: " + PORT);
});