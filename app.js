const express = require('express');
const bodyParser = require('body-parser');

const vehicleRoutes = require('./routes/vehicles');
const slotRoutes = require('./routes/slot');
const statsRoutes = require('./routes/stats');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


vehicleRoutes(app);
slotRoutes(app);
statsRoutes(app);

function  errorHandler (err, req, res, next) {
  if (err && err.status) {
    return res.status(err.status).send(err);
  }
  console.log("ERROR \n", err);
  res.status(500).send({ message: 'Internal server error', errMessage: err.message });
}

app.use(errorHandler)

module.exports = {
  app
}