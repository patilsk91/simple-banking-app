const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

const loans = [];

app.get('/', (req, res) => res.status(200).send('Loan service is running'));

app.get('/loans', (req, res) => {
  res.json(loans);
});

app.get('/loans/:id', (req, res) => {
  const loan = loans.find(l => l.id === req.params.id);
  if (!loan) return res.status(404).json({ message: 'Loan not found' });
  res.json(loan);
});

app.post('/loans', async (req, res) => {
  const { id, accountId, amount, termMonths } = req.body;
  if (!id || !accountId || !amount || !termMonths) {
    return res.status(400).json({ message: 'id, accountId, amount, and termMonths are required' });
  }

  const existing = loans.some(l => l.id === id);
  if (existing) return res.status(409).json({ message: 'Loan already exists' });

  try {
    const accountResponse = await axios.get(`http://account:3001/accounts/${accountId}`);
    const account = accountResponse.data;
    const loan = {
      id,
      accountId,
      amount,
      termMonths,
      status: 'approved',
      approvedAt: new Date().toISOString(),
      accountName: account.name
    };
    loans.push(loan);
    res.status(201).json(loan);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'Account not found for loan' });
    }
    console.error(error.message);
    res.status(500).json({ message: 'Could not validate account' });
  }
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Loan service listening on port ${port}`);
});
