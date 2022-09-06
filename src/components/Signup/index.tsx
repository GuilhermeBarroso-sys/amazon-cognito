import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import {UserPool} from "../../config/UserPool"
export function Signup() {
  function onSubmit({email, password} : FieldValues ) {
     UserPool.signUp(email, password, [], [], (err,data) => {
      if(err) {
        console.log(err)
      }
      console.log(data)
     })
  }
  const {register, handleSubmit} = useForm()
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input type="text" {...register("email")}/>
        <label htmlFor="password">Password</label>
        <input type="password"  {...register("password")}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}