// Express is a node js web application framework
import express, { Express } from 'express';

// Cross-origin resource sharing is a mechanism
import cors from 'cors';

// Node.js body parsing middleware
import bodyParser from 'body-parser';

// connect the route folders
import router from './routes';

// connect the route mongo config folde
import { config, connectDb } from './config/config';

// Logging Library
import logger from './library/logger';

// Socket Library
// import socketio from 'socket.io';

const app: Express = express();
const port = config.server.port;
const allowedOrigins = '*';

// let http = require('http').Server(app);
// let io = require('socket.io')(http);

// io.on('connection', function (socket: any) {
//   console.log('a user connected');
// });

// const socketIO = require('socket.io');
// const io = new Server(app);

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

connectDb(config.mongo.url);
// setupSocket(io);

app.use('/', router());
app.get('/api/v1/alive', (req, res, next) => res.status(200).json({ current_time: new Date() }));

app.listen(port, () => {
  logger.info(`server is running on :${config.server.port}`);
});

// const io = socketIO(server);

// io.on('connection', (socket: any) => {
//   console.log('a user connected', socket);

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
