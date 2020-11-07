//MongoDB using native driver

const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true }  );

const dbName = "fruitsDB";
async function run() {
  try {
    await client.connect();
    console.log("Sucessfully connected");
    const database = client.db(dbName);

    
    const fruitsCollection = database.collection('fruits');

    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };

    // const result = await fruitsCollection.insertMany([
    //     {
    //       name : "Apple",
    //       score : 8,
    //       review : "Great fruit"  
    //     },
    //     {
    //         name : "Orange",
    //         score : 6,
    //         review : "Kinda Sour"  
    //       },
    //       {
    //         name : "Banana",
    //         score : 9,
    //         review : "Great stuff"  
    //       }
        
    // ], options);

    ///console.log(`${result.insertedCount} documents were inserted`);

    const cursor = fruitsCollection.find();

    //console.dir(cursor);
    //print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    await cursor.forEach(console.log);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);