import StorageModel from '../models/storage.js'

export const uploadFile = async (req, res) => {
  try {
    const userId = req.userId
    const { file } = req

    const dataToRegister = {
      fileName: `${file?.filename}`,
      idUser: `${userId}`,
      path: `${file?.path}`
    }

    const responseItem = await StorageModel.create(dataToRegister)

    res.send(responseItem)
  } catch (e) {
    res.status(404).send('Upload Error File')
  }
}

export const getFile = async (req, res) => {
  try {
    const responseItem = await StorageModel.find({})
    res.send(responseItem)
  } catch (e) {
    res.status(404).send('File NOT FOUND')
  }
}
export const getFileX = async (req, res) => {
  try {
    const { fileId } = req.params

    const responseItem = await StorageModel.findById({ _id: fileId })
    res.send(responseItem)
  } catch (e) {
    res.status(404).send('File NOT FOUND')
  }
}

export const getFileUser = async (req, res) => {
  try {
    const responseItem = await StorageModel.find({ idUser: req.userId })
    res.send(responseItem)
  } catch (e) {
    res.status(404).send('Filefor user NOT FOUND')
  }
}
export const getFileUserX = async (req, res) => {
  try {
    const { userId } = req.params

    const responseItem = await StorageModel.find({ idUser: userId })
    res.send(responseItem)
  } catch (e) {
    res.status(404).send('Filefor user NOT FOUND')
  }
}
