import { Schema, model } from 'mongoose'

const StorageSchema = new Schema(
  {
    fileName: {
      type: String
    },
    idUser: {
      type: String
    },
    path: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const StorageModel = model('storage', StorageSchema)
export default StorageModel
