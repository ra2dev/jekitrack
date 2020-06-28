/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const { Schema } = mongoose

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  googleId: { type: String, required: true, unique: true },
  profileImageUrl: String,
})

userSchema.methods.generateJWT = function () {
  console.log({
    id: (this._id ?? this.id).toString(),
    email: this.email,
  })
  const token = jwt.sign(
    {
      id: (this._id ?? this.id).toString(),
      email: this.email,
    },
    'secret',
    {
      expiresIn: 604800, // 1 week
    }
  )
  return token
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
