import mongoose from 'mongoose';

// Create table in db
const billSchema = new mongoose.Schema(
  {
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
  },
  {
    // Date
    timestamps: true,
  }
);
const Bill = mongoose.model('Bill', billSchema);
export default Bill;
