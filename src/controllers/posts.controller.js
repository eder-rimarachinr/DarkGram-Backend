import Post from '../models/Post.js'
import Profile from '../models/Profile.js'
import { Response } from '../libs/response.js'

export const getPosts = async (req, res) => {
  const posts = await Post.find({}).populate('user', {
    username: 1
  }).populate({
    path: 'comments',
    populate: {
      path: 'reComment'
    }
  })

  const response = Response(200, 'all the post', posts)

  res.status(200).json(response)
}

export const getPostsByUserName = async (req, res) => {
  const { username } = req.params

  const user = await Profile.findOne({ username })

  const posts = await Post.find({ user: user._id })
    .populate('user', {
      username: 1
    }).populate({
      path: 'comments',
      populate: {
        path: 'reComment',
        populate: {
          path: 'reComment',
          maxDepth: 2
        }
      }
    })

  res.status(200).json(Array.isArray(posts) ? posts : [posts])
}

export const getPostsByUser = async (req, res) => {
  const user = req.userId

  const posts = await Post.findOne({ user })
    .populate('user', {
      username: 1
    }).populate({
      path: 'comments',
      populate: {
        path: 'reComment',
        populate: {
          path: 'reComment',
          maxDepth: 2
        }
      }
    })

  res.status(200).json(Array.isArray(posts) ? posts : [posts])
}

export const getPostById = async (req, res) => {
  const { postId } = req.params

  const posts = await Post.findById({ _id: postId })
    .populate('user', {
      username: 1
    }).populate({
      path: 'comments',
      populate: {
        path: 'reComment',
        populate: {
          path: 'reComment',
          maxDepth: 2 // aumenta la profundidad máxima a 3 (o el valor que necesites)
        }
      }
    })

  res.status(200).json(posts)
}

export const createPost = async (req, res) => {
  const { description, imgUrl } = req.body

  const newPost = new Post({ description, imgUrl, user: req.userId })

  const postSave = await newPost.save()

  await Profile.findByIdAndUpdate(req.userId, { $push: { posts: postSave._id } })

  res.status(201).json(postSave)
}

export const updatePostById = async (req, res) => {
  const { postId } = req.params

  const updatePost = await Post.findByIdAndUpdate({ _id: postId }, req.body, { new: true })

  res.status(201).json(updatePost)
}

export const deletePostById = async (req, res) => {
  const { postId } = req.params

  await Post.findByIdAndRemove({ _id: postId })

  res.status(204).end()
}
