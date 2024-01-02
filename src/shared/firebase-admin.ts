import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { SessionCookieOptions, getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
  credential: cert({
    privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY
      ? process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined,
    clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID
  })
};

const app = !getApps().length ? initializeApp(firebaseAdminConfig) : getApp();
export const authAdmin = getAuth(app);

export const createSession = (idToken: string, options: SessionCookieOptions) => {
  return authAdmin.createSessionCookie(idToken, options);
};

export const deleteSession = async (session: string) => {
  const token = await authAdmin.verifySessionCookie(session);
  return await authAdmin.revokeRefreshTokens(token.sub);
};
