import multer, { diskStorage } from 'multer'
import path from 'path'

// const PATH_STORAGE = `${process.cwd()}/storage`
const PATH_STORAGE = path.join(`${process.cwd()}`, 'src/public/uploads')

const storage = diskStorage({
  destination (req, file, cb) {
    cb(null, PATH_STORAGE)
  },
  filename (req, file, cb) {
    const ext = file.originalname.split('.').pop()
    const fileNameRandom = `image-${Date.now()}.${ext}`
    cb(null, fileNameRandom)
  }
})

const multerMiddleware = multer({ storage })

export default multerMiddleware
