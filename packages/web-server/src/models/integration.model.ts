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
    access_token: { type: String, required: true },
    token_type: { type: String, required: true },
    expiry_date: { type: Number, required: true },
    scope: String,
  })
)

// { access_token:
//     'ya29.a0AfH6SMB-p-wl2e1RVUaGUjxX_49uSxzfVDix3DHxY1ahN0AqtY0A42UnCwUcVGf1Qvq4zEQWlAs8us7FW_d7eI1WripKIA7AlBP0Nl4tYCud_YFuyQYK0kXQY7J2iSYPMpTOgN4-tycfUD9QnRSRlc2P1sjkwNmfXrA',
//         refresh_token:
//   '1//0cIYSp1OrfstMCgYIARAAGAwSNwF-L9Ir4BkmkmMZDJ2d2HBrfnyU7MCMFlPMjwozju5f0s9tTg4KtPYzbOjorla0nxOPOPNjMUs',
//       scope: 'https://www.googleapis.com/auth/calendar.readonly',
//     token_type: 'Bearer',
//     expiry_date: 1593470250362 }
