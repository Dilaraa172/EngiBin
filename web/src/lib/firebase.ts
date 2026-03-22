import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

type FirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

const getFirebaseConfig = (): FirebaseConfig | null => {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID

  if (
    !apiKey ||
    !authDomain ||
    !projectId ||
    !storageBucket ||
    !messagingSenderId ||
    !appId
  ) {
    return null
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  }
}

let appSingleton: FirebaseApp | null = null

export const getFirebaseApp = (): FirebaseApp | null => {
  if (appSingleton) {
    return appSingleton
  }

  const config = getFirebaseConfig()
  if (!config) {
    return null
  }

  appSingleton = getApps().length ? getApp() : initializeApp(config)
  return appSingleton
}

export const getFirebaseAuth = (): Auth | null => {
  const app = getFirebaseApp()
  if (!app) {
    return null
  }
  return getAuth(app)
}

export const getFirebaseDb = (): Firestore | null => {
  const app = getFirebaseApp()
  if (!app) {
    return null
  }
  return getFirestore(app)
}

export const getFirebaseStorage = (): FirebaseStorage | null => {
  const app = getFirebaseApp()
  if (!app) {
    return null
  }
  return getStorage(app)
}

export const isFirebaseConfigured = (): boolean => getFirebaseConfig() !== null
