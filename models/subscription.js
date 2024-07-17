import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  trainee: {
    type: String,
    required: false,
  },

  year: {
    type: Number,
    required:  true,
  },

  date: {
    type: String,
    required:  true,
  },
  monthsSelected: {
    type: [String], 
    required: false,
  },
  subscriptionType: {
    type: String,
    required: false,
  },
  amount: {
    type: String,
    required: true,
  },
 
});

const  subscription= mongoose.models.subscription || mongoose.model('subscription', subscriptionSchema);
export default subscription;