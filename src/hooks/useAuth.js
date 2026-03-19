import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, EMAIL_TO_USER } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setUserId(firebaseUser ? (EMAIL_TO_USER[firebaseUser.email?.toLowerCase()] || null) : null);
    });
    return unsub;
  }, []);

  return { user, userId, loading: user === undefined };
}
