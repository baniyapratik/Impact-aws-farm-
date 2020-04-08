const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A user name must have at most  40 characters'],
    minlength: [10, 'A user name must have at least  10 characters'],
  },
  firebaseId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: [true, 'A user must have a address'],
  },
  city: {
    type: String,
    required: [true, 'A user must have a city'],
  },
  state: {
    type: String,
    required: [true, 'A user must have a state'],
  },
  zip: {
    type: Number,
    required: [true, 'A user must have a zipcode'],
  },
  usertype: {
    type: String,
    required: [true, 'A user must have a type'],
    enum: {
      values: ['Manager', 'Tester'],
    },
    default: 'Manager',
  },
  carddetails: {
    cardnumber: {
      type: String,
      required: [true, 'A card must have a 16 digit number'],
      maxlength: 16,
      minlength: 16,
    },
    cvv: {
      type: String,
      required: [true, 'A card must have 3 digit cvv'],
      maxlength: 3,
      minlength: 3,
    },
    dateofexpiry: {
      type: String,
      required: [true, 'A card must have expiry date'],
      maxlength: 5,
      minlength: 5,
    },
  },
});

const Manager = mongoose.model('Manager', managerSchema);
module.exports = Manager;
