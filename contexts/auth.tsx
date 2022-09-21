import { onAuthStateChanged } from '@lib/firebase'
import { createContext, PropsWithChildren, SetStateAction,useContext, useEffect, useState } from 'react'

interface UserContext {
  user: null;
  userLoading: boolean;
}

const AuthContext = createContext({ user: null, userLoading: true })

export const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [userLoading, setUserLoading] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged((res: SetStateAction<undefined>) => {
      setUser(res)
      setUserLoading(false)
    })
  }, [])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <AuthContext.Provider value={[user, userLoading] as any}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): UserContext => useContext(AuthContext)
