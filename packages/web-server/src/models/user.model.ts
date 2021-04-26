/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { config } from '../config'

const { Schema } = mongoose

const userSchema = new Schema<any>({
  email: { type: String, required: true, unique: true },
  googleId: { type: String, required: true, unique: true },
  profileImageUrl: String,
})

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      id: (this._id ?? this.id).toString(),
      email: this.email,
    },
    config.sessionCookieKey,
    {
      expiresIn: 604800, // 1 week
    }
  )
}

userSchema.methods.toAuthJSON = function () {
  return {
    id: (this._id ?? this.id)?.toString(),
    email: this.email,
    profileImageUrl: this.profileImageUrl,
    token: `Bearer ${this.generateJWT()}`,
  }
}

export const User = mongoose.model('user', userSchema)
