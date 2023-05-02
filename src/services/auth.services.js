import Profile from '../models/Profile.js'
import Role from '../models/Role.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import { ResponseHeader } from '../libs/responseHeader.js'
import { CODE_STATUS, MESSAGE_TYPE } from '../libs/ResponseData.js'

export const SingUpUser = async ({ email, username, password }) => {
  const pass = await User.encryptPassword(password)

  const newUser = new User({
    emailOMobileNumber: email,
    username,
    password: pass
  })

  const role = await Role.findOne({ name: 'user' })
  newUser.roles = [role._id]

  const saveUser = await newUser.save()

  const profile = new Profile({
    username,
    imgProfile: '/assets/images/profile_ph.png',
    userId: saveUser.id
  })

  const saveProfile = await profile.save()

  const token = jwt.sign({ id: saveProfile.id }, config.SECRET, {
    expiresIn: 84600
  })

  const response = { id: saveProfile.id, token }

  return ResponseHeader(
    CODE_STATUS.SUCCESSFULL,
    MESSAGE_TYPE.SUCCESSFULL,
    response
  )
}

export const SignInUser = async ({ email, password }) => {
  const userFound = await User.findOne({
    $or: [
      { emailOMobileNumber: email },
      { username: email },
      { fullname: email }
    ]
  })

  if (!userFound) {
    return ResponseHeader(CODE_STATUS.NOT_FOUND, MESSAGE_TYPE.NOT_FOUND)
  }

  const pass = await User.comparePassword(password, userFound.password)

  if (!pass) {
    return ResponseHeader(CODE_STATUS.BAD_REQUEST, MESSAGE_TYPE.BAD_PASS)
  }

  const profile = await Profile.findOne({ userId: userFound.id })

  const token = jwt.sign({ id: profile.id }, config.SECRET, {
    expiresIn: 84600
  })

  const response = { id: profile.id, token }

  return ResponseHeader(
    CODE_STATUS.SUCCESSFULL,
    MESSAGE_TYPE.SUCCESSFULL,
    response
  )
}
