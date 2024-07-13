require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DB_NAME;
let client = null;
let db = null;

async function connect() {
  if (!client || !client.topology || !client.topology.isConnected()) {
    client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

async function close() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

module.exports = { connect, close };
