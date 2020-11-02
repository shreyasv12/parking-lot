const { getSlotInformationByRegNo } = require('../models/parking-slot');
const { getVehicleByColor: getVehicleByColorDB } = require('../models/vehicle');

function getVehicleByColor (req, res, next) {
  try {
    let { color } = req.params;
    let vehicleDetails = getVehicleByColorDB(color);
    vehicleDetails.forEach((ele) => {
      ele.slotId = getSlotInformationByRegNo(ele.registrationNo);
    });
    res.send(vehicleDetails);
  } catch (error) {
    next(err);
  }
}

module.exports = {
  getVehicleByColor,
};
