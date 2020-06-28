import { Router } from 'express'
import { BaseJiraIntegration } from '@monoprefix/jira-integration'
import { authCheck } from '../middlewares/authHandler'
import { GitlabIntegration, JiraIntegration } from '../models/integration.model'

const route = new Router()

route.post('/jira', authCheck, async (req: any, res: any) => {
  const userId = req.user?.id
  const { url, username, password } = req.body
  const data = await JiraIntegration.findOneAndUpdate({ userId }, { $set: { url, username, password } })
  if (!data) {
    await new JiraIntegration({ userId, url, username, password }).save()
  }

  res.json({ success: 'true' })
})

route.get('/jira-check', authCheck, async (req: any, res: any) => {
  const userId = req.user?.id
  const { username, password } = (await JiraIntegration.findOne({ userId })) as any
  try {
    await new BaseJiraIntegration({
      host: 'jira.exigeninsurance.com', // TODO change to our host
      username,
      password,
      strictSSL: true,
    }).findIssue()
    res.json({ success: true })
  } catch (e) {
    console.log(e)
  }
})

route.get('/jira', authCheck, async (req: any, res: any) => {
  const userId = req.user?.id
  res.json((await JiraIntegration.findOne({ userId })) || {})
})

route.post('/gitlab', authCheck, async (req: any, res: any) => {
  const userId = req.user?.id
  const { url, token } = req.body
  const data = await GitlabIntegration.findOneAndUpdate({ userId }, { $set: { url, token } })
  if (!data) {
    await new GitlabIntegration({ userId, url, token }).save()
  }

  res.json({ success: 'true' })
})

route.get('/gitlab', authCheck, async (req: any, res: any) => {
  const userId = req.user?.id
  res.json((await GitlabIntegration.findOne({ userId })) || {})
})

export default route
