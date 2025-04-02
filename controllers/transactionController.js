const Transaction = require('../models/Transaction');

// Fetch all transactions
exports.getTransactions = async (req, res) => {
  console.log('Fetching transactions...');
  try {
    const transactions = await Transaction.find().sort({ date: 1 });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send({ error: error.message });
  }
};

// Add a new transaction
exports.addTransaction = async (req, res) => {
  console.log('Adding transaction...');
  console.log('Incoming request body:', req.body);
  try {
    const { description, amount, Type, date } = req.body;

    // Validate input
    if (!description || !amount || !Type) {
      console.error('Validation error: Missing fields', { description, amount, Type });
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newTransaction = new Transaction({ description, amount, Type, date });
    try {
      const savedTransaction = await newTransaction.save();
      res.status(201).json(savedTransaction);
    } catch (error) {
      console.error('Error adding transaction:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
