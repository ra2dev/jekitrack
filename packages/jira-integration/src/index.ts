import Jira from 'jira-client'

export class BaseJiraIntegration {
  jira: Jira

  constructor(props: Jira.JiraApiOptions) {
    this.jira = new Jira(props)
  }

  async findIssue() {
    const data = await this.jira.getAllBoards()
    console.log(data)
  }
}
