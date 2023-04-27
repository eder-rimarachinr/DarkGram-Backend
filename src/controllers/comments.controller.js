import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const createCommment = async (req, res) => {
  const { postId, commentId, comment } = req.body

  const newComment = new Comment({
    comment,
    user: req.userId
  })

  const saveComment = await newComment.save()

  if (commentId) {
    await Comment.findByIdAndUpdate(commentId, {
      $push: { reComment: saveComment._id }
    })
  } else {
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: saveComment._id }
    })
  }
  res.status(201).json(saveComment)
}

export const updateCommment = async (req, res) => {
  const { commentId, comment } = req.body

  const newComment = await Comment.findByIdAndUpdate(
    commentId,
    { comment },
    { new: true }
  )

  res.status(201).json(newComment)
}

export const deleteCommment = async (req, res) => {
  const { commentId } = req.body

  const newComment = await Comment.findByIdAndRemove({ _id: commentId })

  res.status(204).json(newComment)
}
