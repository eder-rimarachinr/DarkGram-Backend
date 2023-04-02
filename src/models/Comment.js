import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
  comment: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  reComment: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
},
{
  timestamps: true,
  versionKey: false
})

// commentSchema.set('toJSON', {
//   transform: (document, returnObject) => {
//     returnObject.id = returnObject._id
//     delete returnObject._id
//   }
// })

export default model('Comment', commentSchema)
