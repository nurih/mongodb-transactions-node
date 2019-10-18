const { MongoClient } = require('mongodb');
const replSet = 'r1'
const dbName = 'test';

// Create a new MongoClient
const client = new MongoClient(`mongodb://localhost/${dbName}?replicaSet=${replSet}`);

(async () => {
    await client.connect();

    const collection = client.db().collection('peeps');

    const session = client.startSession({
        defaultTransactionOptions: {
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' },
            readPreference: 'primary'
        }
    });


    try {

        await session.withTransaction(async () => {

            const insert1result = await collection.insertOne({ _id: 1, name: 'bob' }, { session });

            console.log(`One ... ${insert1result.insertedId}`);

            let ogg = await collection.findOne({ name: 'ogg' });
            
            if (ogg) {
                throw Error('Oh nos! Not Ogg!!!');
            }

            const insert2result = await collection.insertOne({ _id: 2, name: 'kim' }, { session });

            console.log(`Two ... ${insert2result.insertedId}`);

        });

    } catch (err) {

        console.log(err);

    }

    console.log('Done with transactions.');

    var docs = await collection.find({}).toArray();
    docs.forEach(doc => { console.log(doc) });

    // cleanup
    collection.deleteMany({});

    console.log('Cleaned collection.');

    client.close();

})();
