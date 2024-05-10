import http, { Server } from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import env from 'process';

import router from './router';

const app: Express = express();

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false}));

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

app.use('/', router());

app.use((req, res, next) => {
    const error: Error = new Error('Not Found.');
    return res.status(404).json({
        message: error.message
    });
});

const server: Server = http.createServer(app);
server.listen(3000, () => console.log('Listen on http://localhost:3000'));

export default app;