const express = require('express');
const app = express();

const port = process.env.PORT || 3001;

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
