import type { User } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { getFirebaseDb } from "@/lib/firebase"

export const syncUserToFirestore = async (user: User) => {
  const db = getFirebaseDb()
  if (!db) {
    return
  }

  const ref = doc(db, "users", user.uid)
  const snap = await getDoc(ref)
  const isNew = !snap.exists()

  await setDoc(
    ref,
    {
      name: user.displayName ?? "",
      email: user.email ?? "",
      photoURL: user.photoURL ?? null,
      updatedAt: serverTimestamp(),
      ...(isNew ? { createdAt: serverTimestamp() } : {}),
    },
    { merge: true },
  )
}
