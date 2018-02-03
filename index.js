const { spawn } = require( 'child_process' );
const detect = require('detect-port');
const PORT = 9200;

let _ES = false;

const checkIfUp = (done, ct = 0) => {
  spawn('curl', [`localhost:${PORT}`]).on('close', code => {
    if (code === 0 || ct === 10) {
      return done(code);
    }
    setTimeout(() => checkIfUp(done, ct + 1), 1000);
  });
}

const start = (done) => {
  detect(PORT, (err, _port) => {
    if (err) {
      throw err;
    }
    if (PORT !== _port) {
      throw `Port ${PORT} not available`
    }
    const clearData = spawn('rm', ['-rf', `${__dirname}/elasticsearch/logs`, `${__dirname}/elasticsearch/data`]);
    clearData.on('close', code => {
      _ES = spawn(`${__dirname}/elasticsearch/bin/elasticsearch`);
      checkIfUp(done);
    });

  });
}

const kill = () => {
  if (_ES) {
    try {
      _ES.kill();
    } catch (e) {}
  }
}

process.on('exit', kill);

const stop = (done) => {
  checkIfUp(() => {
    kill();
    done();
  });
}

module.exports = {
  start,
  stop
};
