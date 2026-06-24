const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const accounts = [];

app.get('/', (req, res) => res.status(200).send('Account service is running'));

app.get('/accounts', (req, res) => {
  res.json(accounts);
});

app.get('/accounts/:id', (req, res) => {
  const account = accounts.find(a => a.id === req.params.id);
  if (!account) return res.status(404).json({ message: 'Account not found' });
  res.json(account);
});

app.post('/accounts', (req, res) => {
  const { id, name, balance = 0 } = req.body;
  if (!id || !name) return res.status(400).json({ message: 'id and name are required' });
  const exists = accounts.some(a => a.id === id);
  if (exists) return res.status(409).json({ message: 'Account already exists' });
  const account = { id, name, balance };
  accounts.push(account);
  res.status(201).json(account);
});

app.put('/accounts/:id', (req, res) => {
  const account = accounts.find(a => a.id === req.params.id);
  if (!account) return res.status(404).json({ message: 'Account not found' });
  const { name, balance } = req.body;
  if (name) account.name = name;
  if (typeof balance === 'number') account.balance = balance;
  res.json(account);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Account service listening on port ${port}`);
});
