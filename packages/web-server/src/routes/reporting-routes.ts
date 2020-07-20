import { Router } from 'express'
import { BaseGitlabIntegration } from '@monoprefix/gitlab-integration'
import { BaseGoogleCalendarIntegration } from '@monoprefix/google-calendar-integration'
import { authCheck } from '../middlewares/authHandler'
import { GitlabIntegration, GoogleIntegration, JiraIntegration } from '../models/integration.model'
import { notFound } from '../middlewares/errorHandler'
import { getDateRange, mergeEvents } from '../utils/events'
import { BaseJiraIntegration } from '@monoprefix/jira-integration'

const route = new Router()

route.get('/gitlab', authCheck, async (req: any, res: any) => {
  const userId = req.user?.id
  const gitlabConfig: any = await GitlabIntegration.findOne({ userId })

  const { after, before } = getDateRange()
  if (!gitlabConfig) {
    return notFound(req, res)
  }
  const gitlabInstance = new BaseGitlabIntegration({ token: gitlabConfig.token, url: gitlabConfig?.url })

  const events = await gitlabInstance.getEvents({ after, before })

  const googleIntegration: any = await GoogleIntegration.findOne({ userId })

  const googleInstance = new BaseGoogleCalendarIntegration()
  await googleInstance.setCredentials(googleIntegration)

  const googleEvents = await googleInstance.getEvents({ after, before })

  return res.json(mergeEvents(events, googleEvents))
})

route.get('/issue-details/:id', authCheck, async (req: any, res: any) => {
  const { username, password }: any = await JiraIntegration.findOne({ userId: req?.user?.id })
  const jiraIntegration = new BaseJiraIntegration({
    host: 'jira.exigeninsurance.com', // TODO change to our host
    username,
    password,
    strictSSL: true,
  })

  const result = await jiraIntegration.getTaskDetails(req.params.id)

  return res.json({
    summary: result?.fields?.summary,
    description: result?.fields?.description,
  })
})

route.post('/track-time', authCheck, async (req: any, res: any) => {
  const { username, password }: any = await JiraIntegration.findOne({
    userId: req?.user?.id,
  })
  const jiraIntegration = new BaseJiraIntegration({
    host: 'jira.exigeninsurance.com', // TODO change to our host
    username,
    password,
    protocol: 'https',
    strictSSL: true,
  })

  const data = req.body.items

  const logParams: any = []
  Object.entries(data).forEach(([k, v]: any) => {
    return v?.forEach((e: any) => {
      logParams.push([
        e.ticket,
        {
          comment: ' ',
          started: `${k}T00:00:00.000-0700`,
          timeSpentSeconds: e.time * 60 * 1000,
        },
      ])
    })
  })
  console.log('START SUBMIT')
  for (const item of logParams) {
    // await jiraIntegration.logTime(item[0], item[1])
  }
  console.log('END SUBMIT')
  res.json({})
})

export default route
