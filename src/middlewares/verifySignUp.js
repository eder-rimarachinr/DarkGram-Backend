import { ROLES } from '../models/Role.js'
import User from '../models/User.js'

export const checkDuplicateUserNameOrEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username })

  if (user) return res.status(400).json({ message: 'The user already exists' })

  const email = await User.findOne({ username: req.body.email })

  if (email) return res.status(400).json({ message: 'The email already exists' })

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
