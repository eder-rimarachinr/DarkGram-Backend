import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => console.log('Database Connected'))
  .catch(err => console.error('Errot Connected to Database: ' + err))

process.on('uncaughtException', error => {
  console.log(error)
  mongoose.disconnect()
})
