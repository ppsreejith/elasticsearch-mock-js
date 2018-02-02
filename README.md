# Elasticsearch-mock-js

An npm module to quickly spin up and tear down an elasticsearch server for testing purposes. This module exposes two methods:
`start` and `stop`. `start` starts an elasticsearch server after clearing all old data. `stop` kills it.

# Usage
```
const ES = require('elasticsearch-mock-js');

ES.start(() => {
  console.log('Started');
  ES.stop(() => {
    console.log('Stopped');
  });
});
```
