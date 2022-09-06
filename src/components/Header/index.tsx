import { useContext } from "react"
import { AccountContext } from "../../context/Account"

export function Header() {
  const {userIsAuthenticated, logout} = useContext(AccountContext)
  return (
    <header>
      {userIsAuthenticated ? <button onClick={logout}> Logout </button>: <h1>User not authenticated.</h1>}
    </header>
  )
}