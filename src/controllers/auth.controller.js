import { CODE_STATUS } from '../libs/ResponseData.js'
import { ResponseHeader } from '../libs/responseHeader.js'
import { SignInUser, SingUpUser } from '../services/auth.services.js'

const errorResponse = (error) => {
  return ResponseHeader(CODE_STATUS.INTERNAL_SERVER_ERROR, error.message)
}

export const SignUp = async (req, res) => {
  try {
    const response = await SingUpUser(req.body)
    res.status(200).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const SignIn = async (req, res) => {
  try {
    const response = await SignInUser(req.body)
    res.status(200).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}
