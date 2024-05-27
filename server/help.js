
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     dbo.collection("electricalProducts").find().toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });

const getAll = async () => {
    try {
        await client.connect();

        const database = client.db("mydb");
        const electricalProducts = await database.collection("electricalProducts").find().toArray();
        console.log(electricalProducts);

        return electricalProducts;
    }
    catch (error) { 
        throw error;
    }
    finally {
        await client.close();
    }
};

module.exports = { getAll };

// const electricalProductsDB = require('../services/electricalProductsDB')

// const getAll = () =>
// {
//     return electricalProductsDB.getAll();
// }

// module.exports = {getAll};


try {
    const result = await electricalProductsController.getAll();
    res.send(result);
}
catch (err) {
    console.error('Error getting electrical products:', err);
    res.status(500).send('Error getting electrical products');
}
