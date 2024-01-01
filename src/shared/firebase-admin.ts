import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig = {
  credential: cert({
    privateKey: `${process.env.NEXT_PUBLIC_PRIVATE_KEY}`.replace(/\\n/g, '\n'),
    clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID
  })
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
