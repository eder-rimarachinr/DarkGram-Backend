import { CODE_STATUS, MESSAGE_TYPE } from '../libs/ResponseData.js'
import { ResponseHeader } from '../libs/responseHeader.js'
import Profile from '../models/Profile.js'

export const getProfile = async ({ userId }) => {
  const myProfile = await Profile.findById(userId).populate('posts', {
    description: 1,
    imgUrl: 1,
    likes: 1,
    comments: 1
  })

  if (!myProfile) {
    return ResponseHeader(CODE_STATUS.NOT_FOUND, MESSAGE_TYPE.NOT_FOUND)
  }

  return ResponseHeader(
    CODE_STATUS.ACCEPTED,
    MESSAGE_TYPE.SUCCESSFULL,
    myProfile
  )
}

export const getUserProfile = async ({ username }) => {
  const profile = await Profile.findOne({
    $or: [{ id: username }, { username }]
  }).populate('posts', {
    description: 1,
    imgUrl: 1,
    likes: 1,
    comments: 1,
    user: 0
  })

  if (!profile) {
    return ResponseHeader(CODE_STATUS.NOT_FOUND, MESSAGE_TYPE.NOT_FOUND)
  }

  return ResponseHeader(
    CODE_STATUS.SUCCESSFULL,
    MESSAGE_TYPE.SUCCESSFULL,
    profile
  )
}
