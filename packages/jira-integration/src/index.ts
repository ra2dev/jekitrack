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
}
