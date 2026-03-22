"use client"

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { getFirebaseAuth } from "@/lib/firebase"

export const handleGoogleSignIn = async () => {
  const auth = getFirebaseAuth()
  if (!auth) {
    throw new Error("Firebase yapılandırılmadı")
  }
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: "select_account" })
  await signInWithPopup(auth, provider)
}

export const handleSignOut = async () => {
  const auth = getFirebaseAuth()
  if (!auth) {
    return
  }
  await signOut(auth)
}
