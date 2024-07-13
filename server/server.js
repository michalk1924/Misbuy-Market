require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {auth} = require('./middleware');
const {initDB} = require('./initDB')

const shoesRouter = require('./routers/ShoesRouter');
const accessoriesController = require('./routers/AccessoriesRouter');
const clothesRouter = require('./routers/ClothesRouter');
const accountAccessRouter = require('./routers/AccountAccess');
const allItemsRouter = require('./routers/AllItemsRouter');
const usersRouter = require('./routers/UsersRouter');

const specialController = require('./controllers/SpecialController');

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

server.use(express.urlencoded({ extended: true }));

server.use('/api/shoes', shoesRouter);
server.use('/api/clothes', clothesRouter);
server.use('/api/accessories', accessoriesController);
server.use('/api/allitems', allItemsRouter);
server.use('/api/users', usersRouter);
server.use('/', accountAccessRouter);

server.get('/', (req, res) => {
    res.send('main page!');
});

process.on('SIGINT', async () => {
    await specialController.close();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    await specialController.close();
    process.exit(0);
  });

server.listen(port, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});