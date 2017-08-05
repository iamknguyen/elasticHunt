
const client = require('../config/database.js');

module.exports = {
  query: function (req, res, next) {
    client.search({
      index: 'khoa_2017_08_05_index',
      type: 'business',
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
    res.json(req.query);
  }
}