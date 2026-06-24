# Simple Banking App

A microservice-based banking sample app with three services:
- `account`
- `loan`
- `transaction`

## Structure

- `services/account`
- `services/loan`
- `services/transaction`

## Architecture

This application is built as a simple microservice banking platform with three independent services:
- `account`: manages bank account records and balances
- `loan`: handles loan creation and validates accounts via the account service
- `transaction`: records transactions for accounts

Each service runs in its own process and communicates over HTTP. The application is orchestrated with Docker Compose for local development.

For full architecture details, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start a single service:
   ```bash
   npm run start:account
   npm run start:loan
   npm run start:transaction
   ```

3. Start all services with Docker Compose:
   ```bash
   npm run start:all
   ```

## API endpoints

### Account service
- `GET /accounts`
- `GET /accounts/:id`
- `POST /accounts`
- `PUT /accounts/:id`

### Loan service
- `GET /loans`
- `GET /loans/:id`
- `POST /loans`

### Transaction service
- `GET /transactions`
- `GET /transactions/:id`
- `POST /transactions`
