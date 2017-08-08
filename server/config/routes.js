"use strict"
const path = require('path');
const client = require('./database.js');
const elasticController = require('../controllers/Elastic.js');

module.exports = (app, express)=>{

  app.get('/businesses', (req, res, next) => {
    elasticController.getBusinesses(req, res, next);
  });

  app.get('*', (req, res, next) => {
    res.status(404).json({"error": "Not found"});
  });

}