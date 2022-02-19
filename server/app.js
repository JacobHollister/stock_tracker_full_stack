const express = require('express');
const app = express();
const cors = require('cors')
const errorHandlerMiddleware = require('./middleware/error-handler')
const watchlist = require('./routes/watchListRoutes')
const companys = require('./routes/companysRoutes')
const news = require('./routes/newsRoutes')
const candles = require('./routes/candlesRoutes')
const quote = require('./routes/quoteRoutes')
const line = require('./routes/lineRoutes')
const users = require('./routes/usersRoutes')
const trades = require('./routes/tradesRoutes')
const auth = require('./routes/authRoutes')
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.json())
app.use(cors());

// routes
app.use('/api/v1/watchlist', watchlist)
app.use('/api/v1/companys', companys)
app.use('/api/v1/news', news)
app.use('/api/v1/stock/candles', candles)
app.use('/api/v1/stock/quote', quote)
app.use('/api/v1/stock/line', line)
app.use('/api/v1/users', users)
app.use('/api/v1/trades', trades)
app.use('/api/v1/auth', auth)

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch (error){
    console.log(error)
  }
}

start()
