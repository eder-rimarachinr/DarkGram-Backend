import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import pkg from '../package.json' assert { type: 'json' }

import { createRol } from './libs/initialSetup.js'

import ProductRouter from './routes/products.routes.js'
import AuthRouter from './routes/auth.routes.js'
import UserRouter from './routes/user.routes.js'

const app = express()

createRol()

app.set('pkg', pkg)

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({
    nombre: app.get('pkg').name,
    autor: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version

  })
})

app.use('/api/products', ProductRouter)
app.use('/api/auth/', AuthRouter)
app.use('/api/users/', UserRouter)

export default app
