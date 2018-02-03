const ES = require('./');


ES.start((err) => {
  if (err) {
    return console.log('Stopped due to error', err);
  }
  console.log('Started');
  setTimeout(() => {
    ES.stop(() => {
      console.log('Stopped');
    });
  }, 8000);
});
