const express = require('express');
const app = express();
const watchlist = require('./routes/watchList')
const companys = require('./routes/companys')
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware

app.use(express.json())

// routes
app.get('/hello', (req, res) => {
  res.send('Stock Tracker App')
})

app.use('/api/v1/watchlist', watchlist)

// app.get('api/v1/watchlist') - get watchlist
// app.post('api/v1/watchlist') - add stock to watchlist
// app.patch('api/v1/watchlist') - update watchlist positions
// app.delete('api/v1/watchlist') - remove stock from watch list

app.use('/api/v1/companys', companys)

// app.get('api/v1/companys/) - get all companys info
// app.get('api/v1/companys/:ticker) - get individual company info
// app.patch('api/v1/companys/:ticker) - update company info
// app.delete('api/v1/companys/:ticker) - delete company info


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
