import { createContext, useCallback, useEffect, useState } from "react"

export const AppContext = createContext(null)

const AppContextProvider = (props) => {
  const [jwt, setJwt] = useState(null)
  useEffect(() => setJwt(localStorage.getItem("session_jwt")), [])
  const [user, setUser] = useState(null)
  useEffect(() => setUser(localStorage.getItem("user")), [])

  const saveJwt = useCallback((jwt, user) => {
    localStorage.setItem("session_jwt", jwt)
    localStorage.setItem("user", user)
    setJwt(jwt)
    setUser(user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("session_jwt")
    localStorage.removeItem("user")
    setJwt(null)
    setUser(null)
  }, [])

  useEffect(() => {
    const updateContext = () => {
      setJwt(localStorage.getItem("session_jwt"))
      setUser(localStorage.getItem("user"))
    }
    window.addEventListener("storage", updateContext)
    return () => window.removeEventListener("storage", updateContext)
  }, [])

  return (
    <AppContext.Provider {...props} value={{ saveJwt, logout, jwt, user }} />
  )
}

export default AppContextProvider
