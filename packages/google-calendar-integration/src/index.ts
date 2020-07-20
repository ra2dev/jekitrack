/* eslint-disable camelcase,no-unused-expressions */
import { google } from 'googleapis'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import credentials2 from './credentials.todo-remove'
import * as helpers from './helpers'

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

export class BaseGoogleCalendarIntegration {
  credentials: any
  authClient: any

  constructor(tokens?: any) {
    this.credentials = credentials2
    this.authClient = this.getAuthClient()

    if (tokens) {
      this.authClient.setCredentials(tokens)
    }
  }

  getAuthClient() {
    const { client_secret, client_id, redirect_uris } = this.credentials
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
    return oAuth2Client
  }

  async getAccessToken() {
    return this.authClient.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    })
  }

  async authorize(code: string) {
    const { tokens } = await this.authClient.getToken(code)
    this.setCredentials(tokens)
    return tokens
  }

  setCredentials(tokens: any) {
    this.authClient.setCredentials(tokens)
  }

  async getUserEmail() {
    const res = await google
      .people({ version: 'v1', auth: this.authClient })
      .people.get({ resourceName: 'people/me', personFields: 'emailAddresses' })

    return res?.data?.emailAddresses
      ?.find((e) => e.metadata?.primary)
      ?.value?.toString()
      ?.toLowerCase()
  }

  async getEvents({ after, before }: any) {
    const calendar = google.calendar({ version: 'v3', auth: this.authClient })
    const result = await calendar.events.list({
      calendarId: 'primary',
      timeMin: after.toISOString(),
      timeMax: before.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    } as any)

    return helpers.groupEvents(
      result?.data?.items?.map((e) => ({
        start: e.start?.dateTime,
        end: e.end?.dateTime,
      })) as any
    )
  }
}
