import multer, { diskStorage } from 'multer'
import path from 'path'
import fs from 'fs'

// const PATH_STORAGE = `${process.cwd()}/storage`
const PATH_STORAGE = path.join(`${process.cwd()}`, 'src/public/uploads')

if (!fs.existsSync(PATH_STORAGE)) {
  fs.mkdirSync(PATH_STORAGE, { recursive: true })
}

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

export const deleteImage = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err)
    }
    // console.log(`File ${filePath} was deleted`)
  })
}

const multerMiddleware = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Tipo de archivo no permitido'))
    }
    cb(null, true)
  }
})

export default multerMiddleware
