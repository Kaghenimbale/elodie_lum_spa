// firebase/admin.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const app = !getApps().length
  ? initializeApp({ credential: cert(serviceAccount as any) })
  : getApps()[0];

const adminDB = getFirestore(app);

export { adminDB };
