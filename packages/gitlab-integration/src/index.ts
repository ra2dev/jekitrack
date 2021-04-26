import { Gitlab } from '@gitbeaker/node'
import format from 'date-fns/format'
import * as helpers from './helpers'

export class BaseGitlabIntegration {
  static DATE_FORMAT: string = 'yyyy-MM-dd'
  provider: any

  constructor(props: { token: string; url: string }) {
    this.provider = new Gitlab({
      token: props.token,
      host: props.url,
    })
  }

  validateCredentials = async () => {
    return this.provider.Projects.all({ perPage: 1, maxPages: 1 })
  }

  getEvents = async ({ after, before }: any): Promise<any> => {
    const data = await this.provider.Events.all({
      after: format(after, BaseGitlabIntegration.DATE_FORMAT),
      before: format(before, BaseGitlabIntegration.DATE_FORMAT),
    })
    return helpers.groupEvents(data)
  }
}
