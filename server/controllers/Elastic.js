
const client = require('../config/database.js');

module.exports = {
  query: function (req, res, next) {
    client.search({
      index: 'checkins',
      type: 'businesses',
      q: "*"
    }).then(function (resp) {
        var hits = resp.hits.hits;
        res.json(hits)
    }, function (err) {
        console.trace(err.message);
    });
  },

  getBusinesses: function (req, res, next) {
    console.log(req.query);
    let query = req.query.q && req.query.length ? req.query.q : '*';
    let size = req.query.size ? req.query.size : 10;
    let page = req.query.page ? req.query.page : 0;
    if(size < 0 || page < 0){
      res.status(400).json({"error": "Invalid request"})
    }
    client.search({
      index: 'checkins',
      type: 'businesses',
      q: `${query}`,
      from: page,
      size: size,
      // sort: [
      //   {"total_checkins" : "desc"}
      // ]
    })
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
    
  },

  getBusinessesWithCheckins: function (req, res, next) {
    client.search({
      index: 'khoa_2017_08_05_index',
      type: 'business',
      query: {
        body: {
          match: {
            
          }
        }
      }
    }).then(function (resp) {
        var hits = resp.hits.hits;
        res.json(hits)
    }, function (err) {
        console.trace(err.message);
    });
  }
}