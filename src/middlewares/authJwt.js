import jwt from 'jsonwebtoken'
import config from '../config.js'
import User from '../models/User.js'
import Profile from '../models/Profile.js'
import Role from '../models/Role.js'
import { ResponseHeader } from '../libs/responseHeader.js'
import { CODE_STATUS, MESSAGE_TYPE } from '../libs/ResponseData.js'

export const verifyToken = async (req, res, next) => {
  const tokenBearer = req.get('Authorization')

  if (!tokenBearer) {
    const response = ResponseHeader(
      CODE_STATUS.FORBIDDEN,
      MESSAGE_TYPE.NOT_TOKEN_PROVIDE
    )
    return res.status(403).json(response)
  }

  if (!tokenBearer.startsWith('Bearer ')) {
    const response = ResponseHeader(
      CODE_STATUS.UNAUTHORIZED,
      MESSAGE_TYPE.INVALID_TOKEN_PROVIDE
    )
    return res.status(401).json(response)
  }

  const token = tokenBearer.slice(7)

  try {
    const decode = jwt.verify(token, config.SECRET)
    req.userId = decode.id
  } catch (err) {
    const response = ResponseHeader(
      CODE_STATUS.UNAUTHORIZED,
      MESSAGE_TYPE.UNAUTHORIZED
    )
    return res.status(401).json(response)
  }

  const user = await Profile.findById(req.userId, { password: 0 })

  if (!user) {
    const response = ResponseHeader(
      CODE_STATUS.NOT_FOUND,
      MESSAGE_TYPE.NOT_EXISTS
    )
    return res.status(401).json(response)
  }

  next()
}

export const isUser = async (req, res, next) => {
  const profile = await Profile.findById({ _id: req.userId })

  const user = await User.findById({ _id: profile.userId })

  const roles = await Role.find({ _id: { $in: user.roles } })

  const isUser = roles.some((role) => role.name === 'user')
  const isAdmin = roles.some((role) => role.name === 'admin')

  const response = ResponseHeader(CODE_STATUS.FORBIDDEN, MESSAGE_TYPE.UNAUTHICATED)

  return isAdmin || isUser
    ? next()
    : res.status(403).json(response)
}

export const isAdmin = async (req, res, next) => {
  const profile = await Profile.findById({ _id: req.userId })

  const user = await User.findById({ _id: profile.userId })

  const roles = await Role.find({ _id: { $in: user.roles } })

  const isAdmin = roles.some((role) => role.name === 'admin')

  const response = ResponseHeader(CODE_STATUS.FORBIDDEN, MESSAGE_TYPE.UNAUTHICATED)

  return isAdmin || isUser
    ? next()
    : res.status(403).json(response)
}
