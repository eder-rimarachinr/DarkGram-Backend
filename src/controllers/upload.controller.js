import { CODE_STATUS } from '../libs/ResponseData.js'
import { ResponseHeader } from '../libs/responseHeader.js'
import StorageModel from '../models/storage.js'

const errorResponse = (error) => {
  return ResponseHeader(CODE_STATUS.INTERNAL_SERVER_ERROR, error.message)
}

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
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const getFile = async (req, res) => {
  try {
    const responseItem = await StorageModel.find({})
    res.send(responseItem)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}
export const getFileX = async (req, res) => {
  try {
    const { fileId } = req.params

    const responseItem = await StorageModel.findById({ _id: fileId })
    res.send(responseItem)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const getFileUser = async (req, res) => {
  try {
    const responseItem = await StorageModel.find({ idUser: req.userId })
    res.send(responseItem)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}
export const getFileUserX = async (req, res) => {
  try {
    const { userId } = req.params

    const responseItem = await StorageModel.find({ idUser: userId })
    res.send(responseItem)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}
