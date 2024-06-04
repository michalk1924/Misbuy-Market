require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const auth = require('../middleware/auth');

const electricalProductsRouter = require('./routers/electricalProducts');
const signRouter = require('./routers/AccountAccess');

const server = express();
const host = process.env.HOST;
const port = process.env.PORT;

server.use(express.json());

server.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))

//auth add
server.use('/api/electricalProducts',electricalProductsRouter);
server.use('/', signRouter);

server.get('/', (req, res) => {
    res.send('main page!');
});

server.listen(port, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});



// require('dotenv').config()
// const express = require('express');
// const app = express();

// app.use(express.json());

// const port = process.env.PORT;

// app.get('/', (req, res) => {
//     res.send('Welcome');
// });

// const electricalProductsRouter = require('./routers/electricalProducts');

// app.use('/electricalProducts', electricalProductsRouter);

// app.listen(port, () => {
//     console.log(`listening at http://localhost:${port}`);
// });