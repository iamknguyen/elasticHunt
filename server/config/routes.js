
const path = require('path');
const client = require('./database.js');
const elasticController = require('../controllers/Elastic.js');

module.exports = (app, express)=>{

  app.get('/businesses', (req, res, next) => {
    elasticController.getBusinesses(req, res, next);
  });

  app.get('/api/search', (req, res, next) => {
    elasticController.query(req, res, next)
  });

  app.get('/api/users', (req, res, next) => {
    res.json([{
      id: 1,
      username: "khoa"
    }, {
      id: 2,
      username: "nguyen"
    }]);
  });

  app.get('*', (req, res, next) => {
    res.sendfile('./client/build/index.html');
  });

}