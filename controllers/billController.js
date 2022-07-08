import Bill from '../models/billModel.js';

// Add Bill
export const addBillController = async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.send('Bill Created Successfully!');
  } catch (error) {
    console.log(error);
  }
};
