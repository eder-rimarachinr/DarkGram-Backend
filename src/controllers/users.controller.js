import User from '../models/User.js'
import Profile from '../models/Profile.js'

export const getUsers = async (req, res) => {
  const users = await User.find({}).populate('roles',
    {
      name: 1,
      _id: 0
    })
  res.status(200).json(users)
}

export const getUserById = async (req, res) => {
  const profile = await Profile.findById({ _id: req.userId })
  const user = await User.findById({ _id: profile.userId })

  return user
    ? res.status(200).json(user)
    : res.status(404).json({ message: "User does'nt exists" })
}

export const createUser = async (req, res) => {
  res.status(201).json({ message: 'create user' })
}

export const updateUser = async (req, res) => {}

export const deleteUser = async (req, res) => {}
