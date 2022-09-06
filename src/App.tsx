import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { Account } from './context/Account'
import { Status } from './components/Status'
import { Header } from './components/Header'
import { Settings } from './components/Settings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Account>    
      <Header />
      <section>
        <h1>Register</h1>
        <Signup />
      </section>

      <section>
      <h1>Login</h1>
      <Login />
      </section>

      <section>
        <Settings />
      </section>
    </Account>
  )
}

export default App
