const _ = require('lodash');

const config = require('../config/config');

const parkingSlotData = {};

function getEmptySlot () {
  let emptySlots = [];
   for (let slots = 1; slots <= config.totalSlots; slots++) {
     if (_.isEmpty(parkingSlotData[slots])) {
        emptySlots.push({ slotId:  slots });
     }
   }

   return emptySlots;
}

function getSlotInformation (slotId) {
  if (slotId > config.totalSlots) {
    throw new Error("Slot out of range");
  }
  return parkingSlotData[slotId] || {};
}

function getSlotInformationByRegNo (regNo) {
  for (let slots = 1; slots <= config.totalSlots; slots++) {
    if (!_.isEmpty(parkingSlotData[slots]) && parkingSlotData[slots].registrationNo == regNo) {
       return { ...parkingSlotData[slots], slotId: slots };
    }
  }
  return {};
}

function getSlotsByFilter (filter = {}) {
  let slots = [];

  for (let slot = filter.offset || 1; slot <= Math.min(config.totalSlots, filter.limit); slot++) {
    if (_.isEmpty(filter.type) || filter.type === 'ALL') {
      slots.push({ ...parkingSlotData[slot], slotId: slot });
    } else if (filter.type === 'EMPTY' && _.isEmpty(parkingSlotData[slot])) {
      slots.push({ slotId: slot });
    }
  }
  return slots;
}

function insertSlotInformation (slotId, registrationNo) {
  if (slotId > config.totalSlots) {
    throw new Error("Slot out of range");
  }

  parkingSlotData[slotId] = {
    registrationNo,
    created_at: new Date()
  };
}

function updateSlot (slotId) {
  delete parkingSlotData[slotId];
}

module.exports = {
  getEmptySlot,
  getSlotInformation,
  insertSlotInformation,
  updateSlot,
  getSlotsByFilter,
  getSlotInformationByRegNo
};