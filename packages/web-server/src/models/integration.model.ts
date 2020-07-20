import mongoose from 'mongoose'

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
  // TODO add it back
  // delete obj.password
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
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    token_type: { type: String, required: true },
    expiry_date: { type: Number, required: true },
    scope: String,
  })
)
