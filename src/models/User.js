import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
  emailOMobileNumber: {
    type: String,
    unique: true
  },
  fullname: String,
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    ref: 'Role',
    type: Schema.Types.ObjectId
  }]
},
{
  timestamps: true,
  versionKey: false
})

// userSchema.set('toJSON', {
//   transform: (document, returnObject) => {
//     returnObject.id = returnObject._id
//     delete returnObject._id
//   }
// })

// metodos estaticos
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}
userSchema.statics.comparePassword = async (password, recivedPassword) => {
  return await bcrypt.compare(password, recivedPassword)
}

export default model('User', userSchema)
