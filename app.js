const express = require('express');
const app = express();
const watchlist = require('./routes/watchListRoutes')
const companys = require('./routes/companysRoutes')
const news = require('./routes/newsRoutes')
const candles = require('./routes/candlesRoutes')
const quote = require('./routes/quoteRoutes')
const line = require('./routes/lineRoutes')
const users = require('./routes/usersRoutes')
const auth = require('./routes/authRoutes')
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.json())

// routes
app.get('/hello', (req, res) => {
  res.send('Stock Tracker App')
})

app.use('/api/v1/watchlist', watchlist)

app.use('/api/v1/companys', companys)

app.use('/api/v1/news', news)

app.use('/api/v1/stock/candles', candles)

app.use('/api/v1/stock/quote', quote)

app.use('/api/v1/stock/line', line)

app.use('/api/v1/users', users)

app.use('/api/v1/auth', auth)

const port = 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch (error){
    console.log(error)
  }
}

start()
