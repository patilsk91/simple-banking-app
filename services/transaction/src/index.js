const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const transactions = [];

app.get('/', (req, res) => res.status(200).send('Transaction service is running'));

app.get('/transactions', (req, res) => {
  res.json(transactions);
});

app.get('/transactions/:id', (req, res) => {
  const transaction = transactions.find(t => t.id === req.params.id);
  if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
  res.json(transaction);
});

app.post('/transactions', (req, res) => {
  const { id, accountId, type, amount, description } = req.body;
  if (!id || !accountId || !type || !amount) {
    return res.status(400).json({ message: 'id, accountId, type, and amount are required' });
  }

  const exists = transactions.some(t => t.id === id);
  if (exists) return res.status(409).json({ message: 'Transaction already exists' });

  const transaction = {
    id,
    accountId,
    type,
    amount,
    description: description || null,
    createdAt: new Date().toISOString()
  };

  transactions.push(transaction);
  res.status(201).json(transaction);
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Transaction service listening on port ${port}`);
});
