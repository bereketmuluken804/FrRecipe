import { OAuth2Client} from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "./config.js";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();
  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    emailVerified: payload.email_verified
  }
}