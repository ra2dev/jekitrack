import mongoose from 'mongoose'
import omit from 'lodash/omit'

const { Schema } = mongoose

const integrationBase = {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
}

const jiraSchema = new Schema({
  ...integrationBase,
  url: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
})

jiraSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export const JiraIntegration = mongoose.model('jira-integration', jiraSchema)

export const GitlabIntegration = mongoose.model(
  'gitlab-integration',
  new Schema({
    ...integrationBase,
    url: { type: String, required: true },
    token: { type: String, required: true },
  })
)

export const GoogleIntegration = mongoose.model(
  'google-integration',
  new Schema({
    ...integrationBase,
    token: { type: String, required: true },
  })
)
