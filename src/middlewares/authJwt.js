import jwt from 'jsonwebtoken'
import config from '../config.js'
import User from '../models/User.js'
import Role from '../models/Role.js'

export const verifyToken = async (req, res, next) => {
  const tokenBearer = req.get('Authorization')

  if (!tokenBearer) return res.status(403).json({ message: 'No token provide' })

  if (!tokenBearer.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' })
  }

  const token = tokenBearer.slice(7)

  try {
    const decode = jwt.verify(token, config.SECRET)
    req.userId = decode.id
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const user = await User.findById(req.userId, { password: 0 })

  if (!user) return res.status(401).json({ message: "User does'nt exist" })

  next()
}

export const isUser = async (req, res, next) => {
  const user = await User.findById(req.userId)

  const roles = await Role.find({ _id: { $in: user.roles } })

  const isUser = roles.some(role => role.name === 'user')
  const isModerator = roles.some(role => role.name === 'moderator')
  const isAdmin = roles.some(role => role.name === 'admin')

  return isModerator || isAdmin || isUser
    ? next()
    : res.status(403).json({ message: 'Require be member of system' })
}

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId)

  const roles = await Role.find({ _id: { $in: user.roles } })

  const isModerator = roles.some(role => role.name === 'moderator')
  const isAdmin = roles.some(role => role.name === 'admin')

  return isModerator || isAdmin
    ? next()
    : res.status(403).json({ message: 'Require moderator or admin Role' })
}

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId)

  const roles = await Role.find({ _id: { $in: user.roles } })

  const isAdmin = roles.some(role => role.name === 'admin')

  return isAdmin
    ? next()
    : res.status(403).json({ message: 'Require admin role' })
}

