import { CognitoUserPool, ICognitoUserPoolData } from "amazon-cognito-identity-js"
// pool id sa-east-1_FjY0kFHZG
// client web site ID 725034gcn77kbh81vu6prmjb5u

const poolData : ICognitoUserPoolData = {
  UserPoolId: "sa-east-1_FjY0kFHZG",
  ClientId: "725034gcn77kbh81vu6prmjb5u" 
}
const UserPool = new CognitoUserPool(poolData)

export  {UserPool}
