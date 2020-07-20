import Jira from 'jira-client'

export class BaseJiraIntegration {
  provider: Jira

  constructor(props: Jira.JiraApiOptions) {
    this.provider = new Jira(props)
  }

  async validateCredentials() {
    const data = await this.provider.getAllBoards()
    return !!data
  }

  async getTaskDetails(ticket: string) {
    return this.provider.findIssue(ticket)
  }

  addWorklog(issueId: any, worklog: any, newEstimate: any = null, options = {}) {
    const query = {
      adjustEstimate: newEstimate ? 'new' : 'auto',
      ...(newEstimate ? { newEstimate } : {}),
      ...options,
    }

    const header = {
      uri: (this.provider as any).makeUri({
        pathname: `/issue/${issueId}/worklog`,
        query,
      }),
      body: worklog,
      method: 'POST',
      'Content-Type': 'application/json',
      json: true,
    }

    return (this.provider as any).doRequest(header)
  }

  async logTime(issueId: string, worklog: any) {
    return this.provider.addWorklog(issueId, worklog)
  }
}
