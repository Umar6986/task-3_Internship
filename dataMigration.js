const mysql = require('mysql2');
const MongoClient = require('mongodb').MongoClient;

// MySQL Configuration
const mysqlConfig = {
  host: 'mysql_host',
  user: 'mysql_user',
  password: 'mysql_password',
  database: 'mysql_database',
};

// MongoDB Configuration
const mongoUrl = 'mongodb://localhost:27017';
const mongoDbName = 'mongodb_database';

(async () => {
  const mysqlConnection = mysql.createConnection(mysqlConfig);
  const mongoClient = new MongoClient(mongoUrl, { useNewUrlParser: true });

  try {
    // Connect to MySQL
    await mysqlConnection.connect();

    // Connect to MongoDB
    await mongoClient.connect();
    const db = mongoClient.db(mongoDbName);

    // Perform data migration from MySQL to MongoDB
    const [rows, fields] = await mysqlConnection.promise().query('SELECT * FROM your_table');
    await db.collection('mongodb_collection').insertMany(rows);

    console.log('Data migration completed.');
  } catch (err) {
    console.error('Error during data migration:', err);
  } finally {
    mysqlConnection.end();
    mongoClient.close();
  }
})();
