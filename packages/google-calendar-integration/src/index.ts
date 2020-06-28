/* eslint-disable camelcase */
import { google } from 'googleapis'
import { getAccessToken } from './helpers'

const credentials2 = {
  client_id: '770056324406-9te1fa2abgqp05gbgs6qk7mqg7t60he7.apps.googleusercontent.com',
  project_id: 'quickstart-1579093412951',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_secret: 'twU0Z2J3NYJ68p6FDeOLJhXl',
  redirect_uris: ['http://localhost:3000/integrations'],
  javascript_origins: ['http://localhost:3000'],
}

// scope
// ?code=4/1QEGRCc9SFg8pJWXKE4LCHcVMXebfJtswRz6X8HJFqMd_GchP0wp49SQXri-VnaIUwuCwI-Me-xpjgLm4z_pp5A&scope=https://www.googleapis.com/auth/calendar.readonly
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
class GoogleCalendarIntegration {
  constructor(private credentials: any) {
    this.authorize()
  }

  async authorize() {
    const { client_secret, client_id, redirect_uris } = this.credentials
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

    await getAccessToken(oAuth2Client, () => {})
    // const token =
    // oAuth2Client.setCredentials(JSON.parse(token as any))
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

new GoogleCalendarIntegration(credentials2)
