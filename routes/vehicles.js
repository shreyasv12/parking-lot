const { hanleVehicleEntry, hanleVehicleExit, getSlotNoByRegNo, validateVehicleData } = require('../controller/vehicles');

module.exports = (app) => {
  app.post('/vehicles/entry', validateVehicleData, hanleVehicleEntry);
  app.post('/vehicles/exit', validateVehicleData, hanleVehicleExit);
  
  app.get('/vehicles/:registrationNo/slot', getSlotNoByRegNo);
};
