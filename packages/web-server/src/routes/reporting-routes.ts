import { Router } from 'express'
import { BaseGitlabIntegration } from '@monoprefix/gitlab-integration'
import { BaseGoogleCalendarIntegration } from '@monoprefix/google-calendar-integration'
import { authCheck } from '../middlewares/authHandler'
import { GitlabIntegration, GoogleIntegration } from '../models/integration.model'
import { notFound } from '../middlewares/errorHandler'

const route = new Router()

route.get('/gitlab', authCheck, async (req: any, res: any) => {
  const userId = req.user?.id
  const gitlabConfig: any = await GitlabIntegration.findOne({ userId })

  if (!gitlabConfig) {
    return notFound(req, res)
  }
  const gitlabInstance = new BaseGitlabIntegration({ token: gitlabConfig.token, url: gitlabConfig?.url })
  const events = await gitlabInstance.getEvents()
  const googleIntegration = await GoogleIntegration.findOne({ userId })

  console.log('googleIntegration', userId, googleIntegration)
  // access_token:
  return res.json(events)
})

export default route
