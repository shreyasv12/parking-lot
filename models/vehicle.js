const vehicleData = {};

function getVehicleDetails (registrationNo) {
  if (vehicleData && vehicleData[registrationNo]) {
    return { ...vehicleData[registrationNo],  registrationNo};
  }
  return null;
}

function updateVehicleDetails (registrationNo, vehicleDetails) {
  if (vehicleData && vehicleData[registrationNo]) {
    vehicleData[registrationNo] = {
      ...vehicleData[registrationNo],
      color: vehicleDetails.color || null
    }
  }
}

function insertVehicleDetails (registrationNo, vehicleDetails) {
  vehicleData[registrationNo] = {
    color: vehicleDetails.color || null,
  }
}

function getVehicleByColor (color) {
  let vehicle = [];
  Object.keys(vehicleData).forEach(ele => {
    if (vehicleData[ele].color === color) {
      vehicle.push({ ...vehicleData[ele], registrationNo: ele });
    }
  });
  return vehicle;
}

module.exports = {
  vehicleData,
  getVehicleDetails,
  updateVehicleDetails,
  insertVehicleDetails,
  getVehicleByColor
};
