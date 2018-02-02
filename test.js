const ES = require('./');


ES.start(() => {
  console.log('Started');
});
setTimeout(() => {
  ES.stop(() => {
    console.log('Stopped');
  });
}, 15000);
