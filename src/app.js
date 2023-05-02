import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

import { createRol } from './libs/initialSetup.js'

import PostRouter from './routes/posts.routes.js'
import AuthRouter from './routes/auth.routes.js'
import UserRouter from './routes/user.routes.js'
import ProfileRouter from './routes/profile.routes.js'
import CommentRouter from './routes/comments.routers.js'
import UploadRouter from './routes/upload.router.js'

const app = express()

createRol()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/public', express.static(path.join(process.cwd(), 'src/public/uploads')))
app.use('/api/posts', PostRouter)
app.use('/api/auth', AuthRouter)
app.use('/api/users', UserRouter)
app.use('/api/profile', ProfileRouter)
app.use('/api/comments', CommentRouter)
app.use('/api/upload', UploadRouter)

export default app
