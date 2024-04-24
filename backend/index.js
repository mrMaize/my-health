import { initialize, close } from './src/services/web-server.js';

async function startup() {
  console.log('Starting application');

  try {
    console.log('Initializing web server module');

    await initialize();
  } catch (err) {
    console.error(err);
    process.exit(1); // Non-zero failure code
  }
}

async function shutdown(e) {
  let err = e;

  console.log('Shutting down');

  /*try {
        console.log('Closing database module');

        await database.close();
    } catch (e) {
        console.log('Encountered error', e);

        err = err || e;
    }*/

  console.log('Exiting process');

  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}

startup();

process.on('SIGTERM', () => {
  console.log('Received SIGTERM');

  shutdown().then((res) => {
    console.log(res);
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT');

  shutdown().then((res) => {
    console.log(res);
  });
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception');
  console.error(err);

  shutdown(err).then((res) => {
    console.log(res);
  });
});
