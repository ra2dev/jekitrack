/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const { Schema } = mongoose

const userSchema = new Schema({
  email: String,
  googleId: String,
  profileImageUrl: String,
})

userSchema.methods.generateJWT = function () {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  return jwt.sign(
    {
      email: this.email,
      id: this._id ?? this.id,
      exp: parseInt((expirationDate.getTime() / 1000).toString(), 10),
    },
    'secret'
  )
}

userSchema.methods.toAuthJSON = function () {
  return {
    id: this._id ?? this.id,
    email: this.email,
    profileImageUrl: this.profileImageUrl,
    token: `Bearer ${this.generateJWT()}`,
  }
}

export const User = mongoose.model('user', userSchema)
