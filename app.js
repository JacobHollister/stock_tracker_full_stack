const express = require('express');
const app = express();
const watchlist = require('./routes/watchList')
const companys = require('./routes/companys')
const news = require('./routes/news')
const candles = require('./routes/candles')
const quote = require('./routes/quote')
const line = require('./routes/line')
const users = require('./routes/users')
const auth = require('./routes/auth')
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
