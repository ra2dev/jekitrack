/* eslint-disable camelcase,no-unused-expressions */
import { google } from 'googleapis'

const credentials2 = {}

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

export class BaseGoogleCalendarIntegration {
  credentials: any
  authClient: any

  constructor() {
    this.credentials = credentials2
    this.authClient = this.getAuthClient()
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
    this.authClient.setCredentials(tokens)
    return tokens
  }

  async listEvents() {
    const calendar = google.calendar({ version: 'v3', auth: this.authClient })
    const result = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    })
    return result
  }
}
