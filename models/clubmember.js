import mongoose from 'mongoose';

const clubmemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  bloodgroup: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  inducername: {
    type: String,
    required: true,
  },
  induceraddress: {
    type: String,
    required: true,
  },
  joiningdate: {
    type: String,
    required: false,
  },

});

const clubmember = mongoose.models.clubmember || mongoose.model('clubmember', clubmemberSchema);
export default clubmember;