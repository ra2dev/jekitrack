/* eslint-disable camelcase */
import { google } from 'googleapis'

const credentials2 = {}

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

export class GoogleCalendarIntegration {
  constructor(private credentials: any) {
    this.authorize()
  }

  async authorize() {
    const { client_secret, client_id, redirect_uris } = this.credentials
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

    const token = oAuth2Client.setCredentials(JSON.parse(token as any))
    // return oAuth2Client
  }

  async getAccessToken(oAuth2Client: any, callback: any) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    })

    console.log('HERERE')
    console.log(authUrl)

    // TODO show it for user
    // oAuth2Client.getToken(code, (err: any, token: any) => {
    //   if (err) {
    //     return console.error('Error retrieving access token', err)
    //   }
    //   oAuth2Client.setCredentials(token)
    //   callback(oAuth2Client)
    // })
  }

  async execute() {}
}
