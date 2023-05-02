import { CODE_STATUS, MESSAGE_TYPE } from '../libs/ResponseData.js'
import { ResponseHeader } from '../libs/responseHeader.js'
import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const addComment = async (req) => {
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

  return ResponseHeader(
    CODE_STATUS.CREATED,
    MESSAGE_TYPE.CREADED,
    saveComment)
}

export const updateComment = async ({ commentId, comment }) => {
  const newComment = await Comment.findByIdAndUpdate(
    commentId,
    { comment },
    { new: true }
  )

  return ResponseHeader(
    CODE_STATUS.CREATED,
    MESSAGE_TYPE.UPDATED,
    newComment)
}

export const deleteCommment = async ({ commentId }) => {
  await Comment.findByIdAndRemove({ _id: commentId })
  return ResponseHeader(
    CODE_STATUS.NOT_CONTENT,
    MESSAGE_TYPE.DELETED)
}
