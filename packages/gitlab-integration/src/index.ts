import { Gitlab } from '@gitbeaker/node'

export class BaseGitlabIntegration {
  provider: any

  constructor(props: { token: string; url: string }) {
    this.provider = new Gitlab({
      token: props.token,
      host: 'http://vnoeisgengit02.exigengroup.com/' || props.url,
    })
  }

  validateCredentials = async () => {
    const data = await this.provider.Projects.all({ perPage: 1, maxPages: 1 })
    return data
  }
}
