/* eslint-disable camelcase,no-unused-expressions */
import { google } from 'googleapis'

const credentials2 = {
}

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

export class BaseGoogleCalendarIntegration {
  credentials: any
  authClient: any

  constructor(tokens: any) {
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
    this.authClient.setCredentials(tokens)
    console.log('TOKENS--------------------------')
    console.log('TOKENS--------------------------', tokens)
    return tokens
  }

  async getUserDetails() {
    const calendar = google.calendar({ version: 'v3', auth: this.authClient })
    const result = await
    return result
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
