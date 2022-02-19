require('dotenv').config({ path: process.cwd() + '/.env' });

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const database = require('./database');
const cors = require('cors');
const routes = require('./routes');
const { errorsHandler } = require('./middlewares/errorsHandler');

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await database.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
    process.exit(1);
  }
}

const port = parseInt(process.env.PORT || '5000', 10);
const dev = process.env.NODE_ENV !== 'production';


(async () => {
  const server = express();
  server.use(cors({
    "origin": "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }));

  await assertDatabaseConnectionOk();
  server.use(express.json());

  routes(server);

  server.use(errorsHandler);

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
