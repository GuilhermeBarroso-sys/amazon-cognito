import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../context/Account";
import { ChangePassword } from "../ChangePassword";

export function Settings() {
  const {getSession} = useContext(AccountContext)
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    getSession()
    .then(() => {
      setLoggedIn(true)
    })
    .catch(() => {})
  })

  return <div>{loggedIn && (
    <>
    <h2> Settings </h2>
    <ChangePassword />
    </>
  )}</div>
}