import { ResponseHeader } from '../libs/responseHeader.js'
import { CODE_STATUS, MESSAGE_TYPE } from '../libs/ResponseData.js'
import Post from '../models/Post.js'
import StorageModel from '../models/storage.js'
import Profile from '../models/Profile.js'
import { deleteImage } from '../middlewares/file.js'
import mongoose from 'mongoose'

export const getAllPosts = async () => {
  const post = await Post.find({}).sort({ createdAt: -1 }).populate('user', {
    username: 1
  })

  return ResponseHeader(CODE_STATUS.ACCEPTED, MESSAGE_TYPE.SUCCESSFULL, post)
}

export const getUserPost = async ({ userId }) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(userId)
  if (!isValidObjectId) {
    return ResponseHeader(CODE_STATUS.NOT_FOUND, MESSAGE_TYPE.NOT_FOUND)
  }

  const post = await Post.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate('user', {
      username: 1
    })
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'user',
          select: 'username'
        },
        {
          path: 'reComment',
          populate: [
            {
              path: 'user',
              select: 'username'
            },
            {
              path: 'reComment',
              populate: {
                path: 'user',
                select: 'username'
              }
            }
          ]
        }
      ]
    })

  return ResponseHeader(CODE_STATUS.ACCEPTED, MESSAGE_TYPE.SUCCESSFULL, post)
}

export const getUserIdPost = async (req) => {
  const { postId } = req.params

  const isValidObjectId = mongoose.Types.ObjectId.isValid(postId)
  if (!isValidObjectId) {
    return ResponseHeader(CODE_STATUS.NOT_FOUND, MESSAGE_TYPE.NOT_FOUND)
  }

  const posts = await Post.findById({ _id: postId })
    .sort({ createdAt: -1 })
    .populate({
      path: 'user',
      select: 'username'
    })
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'user',
          select: 'username'
        },
        {
          path: 'reComment',
          populate: [
            {
              path: 'user',
              select: 'username'
            },
            {
              path: 'reComment',
              populate: {
                path: 'user',
                select: 'username'
              }
            }
          ]
        }
      ]
    })
  return ResponseHeader(CODE_STATUS.ACCEPTED, MESSAGE_TYPE.SUCCESSFULL, posts)
}

export const getUserNamePost = async (req) => {
  const { username } = req.params

  const user = await Profile.findOne({ username })

  const post = await Post.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate('user', {
      username: 1
    })
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'user',
          select: 'username'
        },
        {
          path: 'reComment',
          populate: [
            {
              path: 'user',
              select: 'username'
            },
            {
              path: 'reComment',
              populate: {
                path: 'user',
                select: 'username'
              }
            }
          ]
        }
      ]
    })

  return ResponseHeader(CODE_STATUS.ACCEPTED, MESSAGE_TYPE.SUCCESSFULL, post)
}

export const addPost = async (req) => {
  const userId = req.userId

  const isValidObjectId = mongoose.Types.ObjectId.isValid(userId)
  if (!isValidObjectId) {
    return ResponseHeader(CODE_STATUS.NOT_FOUND, MESSAGE_TYPE.NOT_FOUND)
  }

  const { description } = req.body
  const { file } = req

  const dataToRegister = {
    fileName: `${file?.filename}`,
    idUser: `${userId}`,
    path: `${file?.path}`
  }

  const responseItem = await StorageModel.create(dataToRegister)

  const { fileName } = responseItem

  const newPost = new Post({ description, imgUrl: fileName, user: req.userId })

  const postSave = await newPost.save()

  await Profile.findByIdAndUpdate(req.userId, {
    $push: { posts: postSave._id }
  })

  return ResponseHeader(CODE_STATUS.CREATED, MESSAGE_TYPE.CREATED, postSave)
}

export const updatePost = async (req) => {
  const { postId } = req.params

  const isValidObjectId = mongoose.Types.ObjectId.isValid(postId)
  if (!isValidObjectId) {
    return ResponseHeader(CODE_STATUS.NOT_FOUND, MESSAGE_TYPE.NOT_FOUND)
  }

  const updatePost = await Post.findByIdAndUpdate({ _id: postId }, req.body, {
    new: true
  })

  return ResponseHeader(CODE_STATUS.CREATED, MESSAGE_TYPE.UPDATED, updatePost)
}

export const deletePost = async (req) => {
  const { postId } = req.params
  const userId = req.userId

  const isValidObjectId = mongoose.Types.ObjectId.isValid(postId)
  if (!isValidObjectId) {
    return ResponseHeader(CODE_STATUS.NOT_FOUND, MESSAGE_TYPE.NOT_FOUND)
  }

  const isValidObjectIdUser = mongoose.Types.ObjectId.isValid(userId)
  if (!isValidObjectIdUser) {
    return ResponseHeader(CODE_STATUS.BAD_REQUEST, MESSAGE_TYPE.INVALID_ID)
  }

  const post = await Post.findOne({ _id: postId, user: userId })
  if (!post) {
    return ResponseHeader(CODE_STATUS.NOT_FOUND, MESSAGE_TYPE.NOT_FOUND)
  }
  if (post.user.toString() !== userId) {
    return ResponseHeader(CODE_STATUS.UNAUTHORIZED, MESSAGE_TYPE.UNAUTHORIZED)
  }

  const imagePost = post.imgUrl
  const result = await StorageModel.findOne({ fileName: imagePost })

  if (result) {
    const path = result.path
    deleteImage(path)
    await StorageModel.deleteOne({ _id: result._id })
  }

  await Post.deleteOne({ _id: postId })

  return ResponseHeader(CODE_STATUS.NOT_CONTENT, MESSAGE_TYPE.DELETED, post)
}
