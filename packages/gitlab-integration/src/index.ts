import { Gitlab } from '@gitbeaker/node'

class GitlabIntegration {
  provider: any
  constructor() {
    this.provider = new Gitlab({
      token: '15GmKstb_b_65pzBNb_1',
      host: 'http://vnoeisgengit02.exigengroup.com/',
    })
  }

  async execute() {
    const data = await this.provider.Projects.all({
      perPage: 40,
      maxPages: 2,
      showExtended: true,
    })
    console.log(data)
  }
}

new GitlabIntegration().execute()
