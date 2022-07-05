import mongoose from 'mongoose';

// Create table in db
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    // Date
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);
export default Product;
