import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './db.js';
import LinksRouter from './routers/LinkRouter.js';
import UsersRouter from './routers/UserRouter.js';

const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/links', LinksRouter);
app.use('/users', UsersRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
