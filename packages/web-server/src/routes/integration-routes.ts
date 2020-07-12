import { Router } from 'express'
import HttpStatus from 'http-status-codes'
import pick from 'lodash/pick'
import { BaseJiraIntegration } from '@monoprefix/jira-integration'
import { BaseGoogleCalendarIntegration } from '@monoprefix/google-calendar-integration'
import { BaseGitlabIntegration } from '@monoprefix/gitlab-integration'
import { authCheck } from '../middlewares/authHandler'
import { GitlabIntegration, JiraIntegration, GoogleIntegration } from '../models/integration.model'

const route = new Router()

route.post('/jira', authCheck, async (req: any, res: any) => {
  const userId = req.user?.id
  const { url, username, password } = req.body

  try {
    await new BaseJiraIntegration({
      host: 'jira.exigeninsurance.com', // TODO change to our host
      username,
      password,
      strictSSL: true,
    }).validateCredentials()

    const data = await JiraIntegration.findOneAndUpdate({ userId }, { $set: { url, username, password } })
    if (!data) {
      await new JiraIntegration({ userId, url, username, password }).save()
    }
    res.json({ success: true })
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
  }
})

route.get('/jira', authCheck, async (req: any, res: any) => {
  const userId = req.user?.id
  res.json((await JiraIntegration.findOne({ userId })) || {})
})

route.post('/gitlab', authCheck, async (req: any, res: any) => {
  const userId = req.user?.id
  const { url, token } = req.body

  try {
    await new BaseGitlabIntegration({ url: 'http://vnoeisgengit02.exigengroup.com/', token }).validateCredentials()
    const data = await GitlabIntegration.findOneAndUpdate({ userId }, { $set: { url, token } })
    if (!data) {
      await new GitlabIntegration({ userId, url, token }).save()
    }
    res.json({ success: true })
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
  }
})

route.get('/gitlab', authCheck, async (req: any, res: any) => {
  const userId = req.user?.id
  res.json((await GitlabIntegration.findOne({ userId })) || {})
})

route.get('/google-calendar', authCheck, async (req: any, res: any) => {
  const authUrl = await new BaseGoogleCalendarIntegration().getAccessToken()
  const integration = await GoogleIntegration.findOne({ userId: req?.user?.id })

  console.log('googleIntegration', req?.user, integration)
  res.json({ authUrl, integration })
})

route.get('/google-add', authCheck, async (req: any, res: any) => {
  const code = req.query?.code
  const userId = req.user?.id

  const googleIntegration = await new BaseGoogleCalendarIntegration()
  const tokenInfo: any = await googleIntegration.authorize(code)

  'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
    'https://www.googleapis.com/auth/userinfo.email'
  tokenInfo.authClient
  console.log(tokenInfo)
  // const data = await GoogleIntegration.findOneAndUpdate(
  //   { userId },
  //   { $set: pick(tokenInfo, 'access_token', 'expiry_date', 'expiry_date', 'scope') }
  // )
  //
  // if (!data) {
  //   await new GoogleIntegration({
  //     userId,
  //     ...pick(tokenInfo, 'access_token', 'expiry_date', 'expiry_date', 'scope', 'token_type'),
  //   }).save()
  // }

  res.redirect('http://localhost:3000/integrations')
})

export default route
