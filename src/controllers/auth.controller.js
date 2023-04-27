import User from '../models/User.js'
import Role from '../models/Role.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import Profile from '../models/Profile.js'

export const SignUp = async (req, res) => {
  const { emailOMobileNumber, fullname, username, password, roles } = req.body

  const pass = await User.encryptPassword(password)

  const newUser = new User({
    emailOMobileNumber,
    fullname,
    username,
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

  const profile = new Profile({
    fullname,
    username,
    imgProfile: '/assets/images/profile_ph.png',
    userId: saveUser.id
  })

  const saveProfile = await profile.save()

  const token = jwt.sign(
    { id: saveProfile.id },
    config.SECRET,
    { expiresIn: 84600 }
  )

  res.status(200).json({ id: saveProfile.id, token })
}

export const SignIn = async (req, res) => {
  const { email, password } = req.body

  console.log(req.body)

  const userFound = await User.findOne({
    $or: [
      { emailOMobileNumber: email },
      { username: email },
      { fullname: email }
    ]
  })

  if (!userFound) return res.status(400).json({ message: 'User not found' })

  const pass = await User.comparePassword(password, userFound.password)

  if (!pass) return res.status(400).json({ message: 'Password incorrect' })

  const profile = await Profile.findOne({ userId: userFound.id })

  const token = jwt.sign(
    { id: profile.id },
    config.SECRET,
    { expiresIn: 84600 }
  )

  res.status(200).json({ id: profile.id, token })
}
