import { CODE_STATUS } from '../libs/ResponseData.js'
import { ResponseHeader } from '../libs/responseHeader.js'
import { addComment, deleteCommment } from '../services/comments.services.js'

const errorResponse = (error) => {
  return ResponseHeader(CODE_STATUS.INTERNAL_SERVER_ERROR, error.message)
}

export const createdCommment = async (req, res) => {
  try {
    const response = await addComment(req)
    res.status(201).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const updatedCommment = async (req, res) => {
  try {
    const response = await updatedCommment(req)
    res.status(201).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const deletedCommment = async (req, res) => {
  try {
    const response = await deleteCommment(req)
    res.status(201).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}
