import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  description: String,
  imgUrl: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
},
{
  timestamps: true,
  versionKey: false
})

// postSchema.set('toJSON', {
//   transform: (document, returnObject) => {
//     returnObject.id = returnObject._id
//     delete returnObject._id
//   }
// })

export default model('Post', postSchema)
