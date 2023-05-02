import { CODE_STATUS } from '../libs/ResponseData.js'
import { ResponseHeader } from '../libs/responseHeader.js'
import { getProfile, getUserProfile } from '../services/profile.service.js'

const errorResponse = (error) => {
  return ResponseHeader(CODE_STATUS.INTERNAL_SERVER_ERROR, error.message)
}

export const getMyProfile = async (req, res) => {
  try {
    const response = await getProfile(req)
    res.status(200).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const getProfileByUser = async (req, res) => {
  try {
    const response = await getUserProfile(req)
    res.status(200).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}
