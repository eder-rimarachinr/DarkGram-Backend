import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  imgUrl: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true,
  versionKey: false
})

productSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
  }
})

export default model('Product', productSchema)
