// import { google } from 'googleapis'
// import { config } from './config'

// export const googleOAuth2Client = new google.auth.OAuth2(
//   config.GOOGLE_CLIENT_ID,
//   config.GOOGLE_CLIENT_SECRET,
//   config.GOOGLE_REDIRECT_URI
// )

// lib/oauth.ts
import { OAuth2Client } from 'google-auth-library';
import { config } from './config';

export const googleCalendarClient = new OAuth2Client({
  clientId: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  redirectUri: config.GOOGLE_CALENDAR_REDIRECT_URI,
});

// Add better error handling
googleCalendarClient.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    console.log('Refresh token received:', tokens.refresh_token);
  }
});