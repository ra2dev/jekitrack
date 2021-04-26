/* eslint-disable import/first */
// eslint-disable-next-line global-require
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') })

import Joi from 'joi'

const config = {
  port: process.env.APP_PORT || 3001,
  jiraHost: process.env.JIRA_HOST as string,
  gitlabUrl: process.env.GITLAB_API_URL as string,
  clientWebUrl: process.env.WEB_CLIENT_URL as string,
  mongodbUrl: process.env.MONGODB_URL as string,
  sessionCookieKey: process.env.SESSION_COOKIE_KEY as string,

  googleAuthClientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
  googleAuthClientSecret: process.env.GOOGLE_AUTH_SECRET as string,
  googleAuthCallbackUrl: process.env.GOOGLE_AUTH_CALLBACK_URL as string,
  googleAuthScope: [
    'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
}

const schema = Joi.object({
  port: Joi.number(),
  jiraHost: Joi.string(),
  gitlabUrl: Joi.string(),
  clientWebUrl: Joi.string(),
  mongodbUrl: Joi.string(),
  sessionCookieKey: Joi.string(),
  googleAuthClientId: Joi.string(),
  googleAuthClientSecret: Joi.string(),
  googleAuthCallbackUrl: Joi.string(),
  googleAuthScope: Joi.array().items(Joi.string()),
}).options({ presence: 'required' })

// Validating config
const result = schema.validate(config)

if (result.error) {
  throw new Error(`Not valid config, please define correct .env variables in the root, \nError: "${result.error}"`)
}

export { config }
