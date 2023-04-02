import { Schema, model } from 'mongoose'

const profileSchema = new Schema({
  username: String,
  fullname: String,
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  description: String,
  webUrl: String,
  imgProfile: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  savedPost: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true,
  versionKey: false
})

profileSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
  }
})

export default model('Profile', profileSchema)
