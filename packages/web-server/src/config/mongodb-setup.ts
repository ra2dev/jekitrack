/* eslint-disable no-console */
import mongoose from 'mongoose'
import { config } from '../config'

mongoose.connect(config.mongodbUrl, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('CONNECTED to db:', config.mongodbUrl)
})
