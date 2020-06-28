import Jira from 'jira-client'

class JiraIntegration {
  jira: Jira

  constructor(props: Jira.JiraApiOptions) {
    this.jira = new Jira(props)
  }

  async findIssue() {
    const data = await this.jira.findIssue('GENESIS-25152')
    console.log(data)
  }
}

new JiraIntegration({
  host: 'jira.exigeninsurance.com',
  username: 'rramanouski',
  password: '=',
  strictSSL: true,
}).findIssue()
