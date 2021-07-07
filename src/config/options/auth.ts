import Mongoose from 'mongoose'

export default {
  key: null,
  verifyOptions: { algorithms: ['HS256'] },
  validate: async (decoded: any, request: any) => {
    // validate the mongo id
    if (!Mongoose.Types.ObjectId.isValid(decoded["_id"])) {
      return false
    }
    return true
  }
}