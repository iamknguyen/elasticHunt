const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'http://ec2-54-162-18-40.compute-1.amazonaws.com:9200'
});

client.ping({
    requestTimeout: 1000
  }, error => {
    error ? console.trace('elasticsearch cluster is down!', error) : console.log('Elastic search is connected'); 
});


module.exports = client;