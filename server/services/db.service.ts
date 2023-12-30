import mongoose from "mongoose"
import { MONGO_URI } from "../configuration/config"

export const connectDb = () => {
  return mongoose.connect(MONGO_URI, {
    appName: 'Login Server',
    autoCreate: true,
    autoIndex: true
  })
}