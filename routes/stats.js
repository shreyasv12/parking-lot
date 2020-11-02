const { getVehicleByColor } = require('../controller/stats')

module.exports = (app) => {
  app.get('/vechicle/color/:color', getVehicleByColor);
}