import 'express-async-errors'
import express from 'express'
import User from './database/models/User.mode'
import handleError from './middlewares/handleError'
import authRouter from './routes/auth.routes'
import accountRouter from './routes/account.routes'

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/account', accountRouter)

app.get('/', (req, res) => res.status(200).json({message: 'funfou'}))

app.get('/users', async (req, res) => {
  const users = await User.findAll()
  res.status(200).json(users)
})

app.use(handleError)

export default app
