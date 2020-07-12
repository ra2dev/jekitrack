import { Gitlab } from '@gitbeaker/node'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import format from 'date-fns/format'
import * as helpers from './helpers'

export class BaseGitlabIntegration {
  static DATE_FORMAT: string = 'yyyy-MM-dd'
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

  getEvents = async (date = new Date()): Promise<any> => {
    const [after, before] = [startOfWeek(date, { weekStartsOn: 1 }), endOfWeek(date, { weekStartsOn: 1 })].map((e) =>
      format(e, BaseGitlabIntegration.DATE_FORMAT)
    )

    const data = await this.provider.Events.all({ after, before })
    return helpers.groupEvents(data)
  }
}
