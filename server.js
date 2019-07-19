import express from 'express'
import keys from './config/keys'
import mongo from 'mongodb'
import bodyParser from 'body-parser'
let collection = '';
const app = express();
const url = keys.mongoURI;
const serverPort = keys.port;
const dbName = keys.dbName;

//Start server on Port 7000
app.listen(serverPort, () => {
  console.log(`Server listens on port: ${serverPort}`);
});

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json());

mongo.MongoClient.connect(url+dbName, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("db initialized !!!");
  db.close();
});

mongo.connect(url, { useNewUrlParser: true }, function(err, client) {
  const db = client.db(dbName);
  collection = db.collection('pinDetails');
});

app.get('/api/item/:code', async (req, res) => {
  const code = req.params.code;
  if (code == 'insert') {
    console.log('added item to collection');
    collection.insertOne(
      {firstname : 'sample firstname',lastname: 'sample lastname',emailid: 'sample@email.com'}
      , function(err, result) {
      },
    );
    res.send('added item to collection');
  } else {
    res.send('404 error occured');
  }
});

app.get('/api/findAll', async (req, res) => {
  collection.find({}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/users', function(req, res) {
  collection.insertOne(req.body, function (err, result) {
    res.send('added item to collection');
  });
});
