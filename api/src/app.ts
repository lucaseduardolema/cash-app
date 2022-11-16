import 'express-async-errors'
import express from 'express'
import User from './database/models/User.mode'
import handleError from './middlewares/handleError'
import authRouter from './routes/auth.routes'
import accountRouter from './routes/account.routes'
import transactionRouter from './routes/transaction.routes'
import Transactions from './database/models/Transactions.model'
import Account from './database/models/Account.model'

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/account', accountRouter)
app.use('/transaction', transactionRouter)

app.get('/transaction', async (req, res) => {
  const transactions = await Transactions.findAll()
  res.status(200).json(transactions)
})

app.get('/account', async (req, res) => {
  const accounts = await Account.findAll()
  res.status(200).json(accounts)
})

app.get('/users', async (req, res) => {
  const users = await User.findAll()
  res.status(200).json(users)
})

app.use(handleError)

export default app
