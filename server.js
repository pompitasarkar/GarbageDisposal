import express from 'express'
import keys from './config/keys'
import mongo from 'mongodb'
let collection = '';
const app = express();
const url = keys.mongoURI;
const serverPort = keys.port;

//Start server on Port 7000
app.listen(serverPort, () => {
 console.log(`Server started on port`, serverPort);
});

mongo.connect(url, { useNewUrlParser: true }, function(err, client) {
  const db = client.db('dbWaste');
  collection = db.collection('pinDetails');
});

app.get('/api/item/:code', async (req, res) => {
  const code = req.params.code;
  console.log('code is '+code);
  if (code == 'insert') {
    collection.insertOne(
      {firstname : 'sample firstname',lastname: 'sample lastname',emailid: 'sample@email.com'}
      , function(err, result) {
      },
    );
    res.send('item saved to db');
    // return res.redirect('inserted');
  } else {
    res.send('404 Error Occured');
    // return res.redirect('error');
  }
});
