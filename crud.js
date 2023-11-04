const express = require('express');
const app = express();
const port = 3001;
const { MongoClient, ObjectID } = require('mongodb');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const mongoUrl = 'mongodb://localhost:27017';
const mongoDbName = 'mongodb_database';
const mongoClient = new MongoClient(mongoUrl, { useNewUrlParser: true });

(async () => {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
})();

// Create
app.post('http://localhost:5173/', async (req, res) => {
  const db = mongoClient.db(mongoDbName);
  const collection = db.collection('mongodb_collection');
  
  try {
    const newItem = req.body;
    const result = await collection.insertOne(newItem);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item.' });
  }
});

// Read (All)
app.get('/api/items', async (req, res) => {
  const db = mongoClient.db(mongoDbName);
  const collection = db.collection('mongodb_collection');
  
  try {
    const items = await collection.find({}).toArray();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve items.' });
  }
});

// Read (One)
app.get('/api/items/:id', async (req, res) => {
  const db = mongoClient.db(mongoDbName);
  const collection = db.collection('mongodb_collection');
  
  try {
    const itemId = req.params.id;
    const item = await collection.findOne({ _id: ObjectID(itemId) });
    if (!item) {
      res.status(404).json({ error: 'Item not found.' });
    } else {
      res.status(200).json(item);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve item.' });
  }
});

// Update
app.put('http://localhost:5173/:id', async (req, res) => {
  const db = mongoClient.db(mongoDbName);
  const collection = db.collection('mongodb_collection');
  
  try {
    const itemId = req.params.id;
    const updatedItem = req.body;
    const result = await collection.updateOne({ _id: ObjectID(itemId) }, { $set: updatedItem });
    if (result.modifiedCount === 0) {
      res.status(404).json({ error: 'Item not found.' });
    } else {
      res.status(200).json({ message: 'Item updated successfully.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item.' });
  }
});

// Delete
app.delete('http://localhost:5173/id', async (req, res) => {
  const db = mongoClient.db(mongoDbName);
  const collection = db.collection('mongodb_collection');
  
  try {
    const itemId = req.params.id;
    const result = await collection.deleteOne({ _id: ObjectID(itemId) });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Item not found.' });
    } else {
      res.status(200).json({ message: 'Item deleted successfully.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
