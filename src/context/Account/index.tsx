import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js"
import {createContext, ReactNode, useEffect, useState} from "react"
import { UserPool } from "../../config/UserPool"
interface IAccountContext {
  authenticate: (Username : string, Password : string) => Promise<CognitoUserSession>,
  getSession: () => Promise<CognitoSessionResponse>
  logout : () => void
  userIsAuthenticated: boolean
}

interface AccountProps {
  children: ReactNode
}
interface CognitoSessionResponse {
  session: CognitoUserSession | null,
  user: CognitoUser,
  attributes: TUser[]
}

interface TUser  {
  sub?: string,
  email_verified?: boolean,
  email?: string
}


export const AccountContext = createContext({} as IAccountContext)
export function Account ({children} : AccountProps) {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)
  const getSession = async () : Promise<CognitoSessionResponse> => {
    return await new Promise((resolve, reject)   => {
      const user = UserPool.getCurrentUser()
      if(user) {
        user.getSession(async (err : Error, session : CognitoUserSession|null)  => {
          if(err) reject()
          const attributes : TUser[] = await new Promise((resolve,reject)  => {
            user.getUserAttributes((err, attributes) => {
              if(err) {
                reject(err)
              } else {
                //@ts-ignore
                const attributesObj : TUser[]  = attributes?.map((attr) : TUser => {
                  return {
                    [attr.Name]: attr.Value
                  }
                })
               
                resolve(attributesObj)
              }
            }) 
          })
          
          resolve({user, attributes, session})
          setUserIsAuthenticated(true)
        })
      } else {
        setUserIsAuthenticated(false)
        reject()
      }
    })
  }
  const authenticate = async (Username : string, Password : string) : Promise<CognitoUserSession> => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool
      })
      const authDetails = new AuthenticationDetails({
        Username,
        Password
      })
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          setUserIsAuthenticated(true)
          resolve(data)
        }, 
        onFailure: (data) => {
          reject(data)
        },

      })
    })
  }

  const logout = () : void => {
    const user = UserPool.getCurrentUser()
    if(user) {
      user.signOut()
      setUserIsAuthenticated(false)
    }
  }


  useEffect(() => {
    getSession()
    .then(() => {
      setUserIsAuthenticated(true)
    })  
    .catch(() => {})
  }, [])
  return (
    <AccountContext.Provider value = {{ authenticate, getSession, logout, userIsAuthenticated }}>
      {children}
    </AccountContext.Provider>

  )
}