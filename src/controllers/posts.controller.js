import Post from '../models/Post.js'
import Profile from '../models/Profile.js'
import { ResponseHeader } from '../libs/responseHeader.js'
import {
  addPost,
  deletePost,
  getAllPosts,
  getUserIdPost,
  getUserNamePost,
  getUserPost,
  updatePost
} from '../services/posts.services.js'
import { CODE_STATUS } from '../libs/ResponseData.js'

const errorResponse = (error) => {
  return ResponseHeader(CODE_STATUS.INTERNAL_SERVER_ERROR, error.message)
}

export const getPosts = async (req, res) => {
  try {
    const response = await getAllPosts()
    res.status(200).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const getPostsByUserName = async (req, res) => {
  try {
    const response = await getUserNamePost(req)
    res.status(200).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const getPostsByUser = async (req, res) => {
  try {
    const response = await getUserPost(req)
    res.status(201).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const getPostById = async (req, res) => {
  try {
    const response = await getUserIdPost(req)
    res.status(200).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const createPost = async (req, res) => {
  try {
    const response = await addPost(req)
    res.status(201).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const updatePostById = async (req, res) => {
  try {
    const response = await updatePost(req)
    res.status(201).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}

export const deletePostById = async (req, res) => {
  try {
    const response = await deletePost(req)
    res.status(201).json(response)
  } catch (error) {
    res.status(error.status || 500).json(errorResponse(error))
  }
}
