const _ = require('lodash');
const { getSlotsByFilter, getSlotInformation } = require("../models/parking-slot");


function fetchSlots (req, res, next) {
  try {
    let { limit = 10, offset = 0, type = 'ALL' } = req.query;

    offset = parseInt(offset);
    limit = parseInt(limit);

    const filter = {
      limit,
      offset,
      type
    };

    let slots = getSlotsByFilter(filter)
    return res.send(slots);
  } catch (error) {
    next(error);
  }
}

function checkSlotAvailable (req, res, next) {
  try {
    let { slotId } = req.params;

    let slotInformation = getSlotInformation(slotId);

    if (!_.isEmpty(slotInformation)) {
      throw { message: 'Slot is not emoty', status: 422 };
    } else {
      res.send({ message: "Slot Empty" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  fetchSlots,
  checkSlotAvailable
};
