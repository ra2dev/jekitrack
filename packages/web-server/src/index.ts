import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import passport from 'passport'
import bodyParser from 'body-parser'
import logger, { logStream } from './utils/logger'
import * as errorHandler from './middlewares/errorHandler'
import authRoutes from './routes/auth-routes'
import integrationRoutes from './routes/integration-routes'
import reportingRoutes from './routes/reporting-routes'

import './config/passport-setup'
import './config/mongodb-setup'

const app: express.Application = express()

app.use(cors())
app.use(helmet())
app.use(morgan('tiny', { stream: logStream }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(errorHandler.bodyParser)

app.use(passport.initialize())
app.use(passport.session())
app.use(authRoutes)
app.use('/integrations', integrationRoutes)
app.use('/reports', reportingRoutes)

app.get('/', function (req, res) {
  res.send('Hello World! 2 3 5')
})

app.listen(3001, function () {
  logger.info('App is listening on port 3001!')
})
