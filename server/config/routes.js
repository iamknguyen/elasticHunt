
const path = require('path');

module.exports = (app, express)=>{

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