import User from '../models/User.js'
import Role from '../models/Role.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'

export const SignUp = async (req, res) => {
  const { username, email, password, roles } = req.body

  const pass = await User.encryptPassword(password)

  const newUser = new User({
    username,
    email,
    password: pass
  })

  if (roles) {
    const foundRole = await Role.find({ name: { $in: roles } })
    newUser.roles = foundRole.map(role => role._id)
  } else {
    const role = await Role.findOne({ name: 'user' })
    newUser.roles = [role._id]
  }

  const saveUser = await newUser.save()

  const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
    expiresIn: 60 * 60 * 24
  })

  res.status(200).json({ id: saveUser._id, token })
}

export const SignIn = async (req, res) => {
  const { email, password } = req.body

  const userFound = await User.findOne({ email }).populate('roles')

  if (!userFound) return res.status(400).json({ message: 'User not found' })

  const pass = await User.comparePassword(password, userFound.password)

  if (!pass) return res.status(400).json({ message: 'Password incorrect' })

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 60 * 60 * 24
  })

  res.status(200).json({ id: userFound._id, token })
}
