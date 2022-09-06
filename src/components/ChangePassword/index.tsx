import { useContext, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { UserPool } from "../../config/UserPool"
import { AccountContext } from "../../context/Account"

export function ChangePassword() {

  const {getSession} = useContext(AccountContext)
  function onSubmit({password, newPassword} : FieldValues ) {
    getSession().then(({user, attributes}) => {
        user.changePassword(password, newPassword, (err, result) => {
          if(err) {
            console.log(err)
          }
          console.log(result)
        })
    })
  }
  const {register, handleSubmit} = useForm()
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="currentPassword">Current password</label>
        <input {...register("password")} type="password"/>

        <label htmlFor="newPassword">New Password</label>
        <input {...register("newPassword")} type="password"/>
      <button type="submit">Submit</button>
      </form>
    </div>
  )
}