import express from 'express';
import mongo from 'mongodb';
import bodyParser from 'body-parser';
import keys from './config/keys';

let collection = '';
const app = express();
const url = keys.mongoURI;
const serverPort = keys.port;
const { dbName } = keys;

// Start server on Port 7000
app.listen(serverPort, () => {
  console.log(`Server listens on port: ${serverPort}`);
});

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json());

mongo.MongoClient.connect(url + dbName, { useNewUrlParser: true }, (err, db) => {
  if (err) throw err;
  console.log('db initialized !!!');
  db.close();
});

mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
  const db = client.db(dbName);
  collection = db.collection('pinDetails');
});

app.get('/api/item/:code', async (req, res) => {
  const { code } = req.params;
  if (code == 'insert') {
    console.log('added item to collection');
    collection.insertOne(
      { firstname: 'sample firstname', lastname: 'sample lastname', emailid: 'sample@email.com' },
      (err, result) => {
      },
    );
    res.send('added item to collection');
  } else {
    res.send('404 error occured');
  }
});

app.get('/api/findAll', async (req, res) => {
  collection.find({}).toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/users', (req, res) => {
  collection.insertOne(req.body, (err, result) => {
    res.send('added item to collection');
  });
});
