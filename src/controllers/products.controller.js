import Product from '../models/Product.js'
import User from '../models/User.js'

export const getProducts = async (req, res) => {
  const products = await Product.find({}).populate('user', {
    username: 1,
    _id: 0
  })

  res.status(200).json(products)
}

export const getProductsByUser = async (req, res) => {
  const { userId } = req.params

  const userFound = await User.findById({ _id: req.userId })

  if (!userFound) return res.json(401).json({ message: "User does'nt exists" })

  const products = await Product.find({ user: userId })

  res.status(200).json(products)
}

export const getProductById = async (req, res) => {
  const { productId } = req.params

  const product = await Product.findById({ _id: productId })

  res.status(200).json(product)
}

export const createProduct = async (req, res) => {
  const { name, category, price, imgUrl } = req.body

  const newProduct = new Product({ name, category, price, imgUrl, user: req.userId })

  const productSave = await newProduct.save()

  res.status(201).json(productSave)
}

export const updateProductById = async (req, res) => {
  const { productId } = req.params

  const updateProduct = await Product.findByIdAndUpdate({ _id: productId }, req.body, { new: true })

  res.status(201).json(updateProduct)
}

export const deleteProductById = async (req, res) => {
  const { productId } = req.params

  await Product.findByIdAndDelete({ _id: productId })

  res.status(204).end()
}
