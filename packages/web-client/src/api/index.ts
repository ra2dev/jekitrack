import axios from './axios'
import { withFormRequest } from './helpers/form'

export const updateJiraIntegration = withFormRequest((data: any) => axios.post('/integrations/jira', data))
export const fetchJiraIntegration = () => axios.get('/integrations/jira')

export const updateGitlabIntegration = withFormRequest((data: any) => axios.post('/integrations/gitlab', data))
export const fetchGitlabIntegration = () => axios.get('/integrations/gitlab')

export const fetchGoogleCalendarAuthUrl = () => axios.get('/integrations/google-calendar')
