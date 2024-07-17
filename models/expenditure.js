import mongoose from 'mongoose';

const expenditureSchema = new mongoose.Schema({
  expenditures: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: false,
  },
 
});

const expenditure = mongoose.models.expenditure || mongoose.model('expenditure', expenditureSchema);
export default expenditure;