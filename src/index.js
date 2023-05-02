import './database.js'
import app from './app.js'
import config from './config.js'

const PORT = config.PORT || 3000

async function startServer () {
  try {
    await app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
  } catch (error) {
    console.error(`Error starting server: ${error.message}`)
    process.exit(1)
  }
}

startServer()
