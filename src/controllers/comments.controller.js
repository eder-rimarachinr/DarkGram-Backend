import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const createCommment = async (req, res) => {
  const { postId, comment } = req.body

  const newComment = new Comment({
    comment,
    user: req.userId
  })

  const saveComment = await newComment.save()

  await Post.findByIdAndUpdate(postId, { $push: { comments: saveComment._id } })

  res.status(201).json(saveComment)
}

export const updateCommment = async (req, res) => {}

export const deleteCommment = async (req, res) => {}
