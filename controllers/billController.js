import Bill from '../models/billModel.js';

// Fetch Bills
export const getBillsController = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.send(bills);
  } catch (error) {
    console.log(error);
  }
};

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
