import { CODE_STATUS, MESSAGE_TYPE } from '../libs/ResponseData.js'
import { ResponseHeader } from '../libs/responseHeader.js'
import { ROLES } from '../models/Role.js'
import User from '../models/User.js'
import Joi from 'joi'

const userSchema = Joi.object({
  email: Joi.string().min(5).required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required()
})

export const checkDuplicateUserNameOrEmail = async (req, res, next) => {
  const { error } = userSchema.validate(req.body)

  if (error) {
    const response = ResponseHeader(
      CODE_STATUS.BAD_REQUEST,
      error.details[0].message
    )
    return res.status(400).json(response)
  }

  const user = await User.findOne({
    $or: [
      { emailOMobileNumber: req.body.email },
      { username: req.body.username }
    ]
  })

  if (user) {
    const response = ResponseHeader(
      CODE_STATUS.BAD_REQUEST,
      MESSAGE_TYPE.ALREADY_EXISTS
    )
    return res.status(400).json(response)
  }

  next()
}

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    const rolesNotExists = req.body.roles.filter(
      (role) => !ROLES.includes(role)
    )
    if (rolesNotExists.length > 0) {
      const message = `The following roles do not exist: ${rolesNotExists.join(
        ', '
      )}`

      const response = ResponseHeader(CODE_STATUS.BAD_REQUEST, message)
      return res.status(400).json(response)
    }
  }

  next()
}
