import { ROLES } from '../models/Role.js'
import User from '../models/User.js'
import Joi from 'joi'

const userSchema = Joi.object({
  emailOMobileNumber: Joi.string().min(5).required(),
  fullname: Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required()
})

export const checkDuplicateUserNameOrEmail = async (req, res, next) => {
  const { error } = userSchema.validate(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  const user = await User.findOne({
    $or: [
      { emailOMobileNumber: req.body.emailOMobileNumber },
      { username: req.body.username }
    ]
  })

  if (user) return res.status(400).json({ message: 'The user already exists' })

  next()
}

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    const rolesNotExists = req.body.roles.filter(role => !ROLES.includes(role))
    if (rolesNotExists.length > 0) {
      const message = `The following roles do not exist: ${rolesNotExists.join(', ')}`
      return res.status(400).json({ message })
    }
  }

  next()
}
