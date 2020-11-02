const _ = require('lodash');

const { getVehicleDetails, insertVehicleDetails } = require("../models/vehicle");
const { invertVehicleLogData } = require("../models/vehicle-logs");
const { insertSlotInformation, getSlotInformation, updateSlot, getSlotInformationByRegNo } = require("../models/parking-slot");

function validateVehicleData (req, res, next) {
  try {
    let {
      registrationNo,
      color,
      allocatedParkingSlot
    } = req.body; 

    if (!registrationNo) {
      throw { message: 'Restration number of vehicle is requires', status: 422 };
    }
    
    if (!color) {
      throw { message: 'Color of vehicle is requires', status: 422 };
    }
    
    if (!allocatedParkingSlot) {
      throw { message: 'Parking Slot of vehicle is requires', status: 422 };
    }
    next();
  } catch (error) {
    next(error);
  }
}

function checkSlotAvailability(slotId) {
  let data = getSlotInformation(slotId);
  if (!_.isEmpty(data)) {
    throw { message: 'Slot has been occupied', status: 422 };
  }
}

function checkVehicleAlreadyAllocatedSlot (registrationNo) {
  let data = getSlotInformationByRegNo(registrationNo);
  if (!_.isEmpty(data)) {
    throw { message: 'Vehicle already allocated with slot', status: 422 };
  }
}

function hanleVehicleEntry (req, res, next) {
  try {
    let {
      registrationNo,
      color,
      allocatedParkingSlot
    } = req.body; 

    let vehicleDetails = getVehicleDetails(registrationNo);

    if (_.isEmpty(vehicleDetails)) {
      vehicleDetails = {
        registrationNo,
        color
      };
      insertVehicleDetails(registrationNo, vehicleDetails);
    }

    checkSlotAvailability(allocatedParkingSlot);

    checkVehicleAlreadyAllocatedSlot (registrationNo);
    
    insertSlotInformation(allocatedParkingSlot, registrationNo);

    let entryLog = {
      type: 'VEHICLE_ENTRY',
      timestamp: new Date(),
      registrationNo,
      slotId: allocatedParkingSlot
    }

    invertVehicleLogData(entryLog)

    res.send({
      message: 'Vehical entry registered'
    });
  } catch (error) {
    next(error);
  }
}

function hanleVehicleExit (req, res, next) {
  try {
    let {
      registrationNo,
      allocatedParkingSlot
    } = req.body; 
    
    updateSlot(allocatedParkingSlot, registrationNo);

    let entryLog = {
      type: 'VEHICLE_EXIT',
      timestamp: new Date(),
      registrationNo,
      slotId: allocatedParkingSlot
    }

    invertVehicleLogData(entryLog)

    res.send({
      message: 'Vehical exit registered'
    });
  } catch (error) {
    next(error);
  }
}

function getSlotNoByRegNo (req, res, next) {
  try {
    let { registrationNo } = req.params;
    let vechileDetails = getSlotInformationByRegNo(registrationNo);
    res.send(vechileDetails);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  hanleVehicleEntry,
  validateVehicleData,
  hanleVehicleExit,
  getSlotNoByRegNo
};
