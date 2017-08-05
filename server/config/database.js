"use strict"

const elasticsearch = require('elasticsearch');

const Promise = require('bluebird')
const client = new elasticsearch.Client({
  host: 'http://ec2-54-162-18-40.compute-1.amazonaws.com:9200'
});

const myClient = Promise.promisifyAll(client);

client.ping({
    requestTimeout: 1000
  }, error => {
    error ? console.trace('elasticsearch cluster is down!', error) : init(); 
});

const init = () => {
  console.log("Elastic Search is connected!");
  console.log("Creating index...");
  const store = [];
  // myClient.indices.create({
  //   index: 'checkins'
  // })
  // .then(data => {
  //   console.log(data);
  // })
  
  myClient.indices.exists({
    index: 'checkins'
  })
  .then(data => {
    if(data && !data.error_message){
      console.log("Mapping index...", data);
      return myClient.indices.putMapping({
          index: 'checkins',
          type: 'businesses',
          body: {
            "properties" : {
                "id" : { "type" : "string", "index" : "analyzed"},                
                "name" : { "type" : "string", "index" : "analyzed"},
                "full_address" : { "type" : "string", "index" : "analyzed"},
                "total_checkins" : { "type" : "integer", "index" : "analyzed"}
            }
          }
      })
    }else if(data.error_message){
      return createIndex()
    }
  })
  .then(data => {
    console.log(data);
    if(data && !data.error_message){
       return myClient.search({
          index: 'khoa_2017_08_05_index',
          type: 'business',
          q: "*",
          size: "10000"
        })
    }
  })
  .then(data => {
   // console.log(data);
    if(data && !data.error_message){
       let hits = data.hits.hits;
       console.log(hits.length)
        hits.forEach(business => {
          let tmp = {};
          tmp.id = business._id;
          tmp.name = business._source.name;
          tmp.full_address = business._source.full_address;
          tmp.total_checkins = business._source.checkin_info ? countCheckin(business._source.checkin_info) : 0
          let def = { index:  { _index: 'checkins', _type: 'businesses', _id: business._id } }
          store.push(def)
          store.push(tmp);
        });
        //console.log(store)
        return myClient.bulk({
          body: store
        })
    }
  })
  .then(data => {
    if(data){
        console.log("inserted documents", data.items.length);
    }
  })
  .catch(err => {
    console.log(err);
  })
  //*/

  
  console.log("Getting existing data from business");
  //calculateCheckin();
}


const countCheckin = (checkInObj) => {
  let total = 0;
  for(let key in checkInObj){
    total = total + checkInObj[key]
  }
  // console.log(total);
  return total;
}

module.exports = myClient;