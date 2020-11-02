const { checkSlotAvailable, fetchSlots } = require('../controller/slots')

module.exports = (app) => {
  app.get('/slot', fetchSlots);
  
  app.get('/slot/:slotId/available', checkSlotAvailable);
}