import axios from './axios'

export const updateJiraIntegration = (data: any) => axios.post('/integrations/jira', data)
export const fetchJiraIntegration = () => axios.get('/integrations/jira')
export const checkJiraIntegration = (data: any) => axios.get('/integrations/jira-check')

export const updateGitlabIntegration = (data: any) => axios.post('/integrations/gitlab', data)
export const fetchGitlabIntegration = () => axios.get('/integrations/gitlab')
