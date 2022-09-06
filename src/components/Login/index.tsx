import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js"
import {UserPool} from "../../config/UserPool"
import { useContext } from "react"
import { Account, AccountContext } from "../../context/Account"
export function Login() {
  const {authenticate} = useContext(AccountContext)
  async function onSubmit({email, password} : FieldValues ) {
    const data = await authenticate(email, password)
    console.log(data)
  }
  const {register, handleSubmit} = useForm()
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input type="text" {...register("email")}/>
        <label htmlFor="password">Password</label>
        <input type="password"  {...register("password")}/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}