import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';

import { serverConfig } from '../config/web-server.js';

import router from './router.js';

// import dbConfig from '../config/database.js';

// const mongoClient = new MongoClient('mongodb://localhost:27017/', {
//   useNewUrlParser: true,
// });

let httpServer;

export async function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = createServer(app);

    app.all('*', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      //res.set('Access-Control-Expose-Headers', '*')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
    app.use(cors());
    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use('/v1', router);

    // mongoClient.connect((err, client) => {
    //   if (err) return console.log(err);

    //   app.locals.db = client.db(dbConfig.DB_NAME);

    //   httpServer.listen(webServerConfig.port, (err) => {
    //     if (err) {
    //       reject(err);
    //       return;
    //     }
    //     console.log(
    //       `Web server listening on localhost:${webServerConfig.port}`
    //     );
    //     console.log(
    //       `Mongo is connected and client is ready in process.env.dbClient`
    //     );
    //     resolve();
    //   });
    // });

    httpServer.listen(serverConfig.port, (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(`Web server listening on localhost:${serverConfig.port}`);

      resolve();
    });
  });
}

export function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}
