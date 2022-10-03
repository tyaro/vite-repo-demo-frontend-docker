import { AuthAPI } from "../../api/auth";
import { UserType} from "../../types"



export const Signin = async (token:any) => {
  let result = null
  try{
    const res = await AuthAPI.getUserInfo(token)
    const user_info = res.data
    const user: UserType = {
      name: user_info.loginid,
      role: user_info.role
    }
    result = user
  }catch{
    result = null
  }
  return result
}

// 認証処理
export const Authentication = async (value: any) => {
  let result = null
  try{
    result = false
    const res = await AuthAPI.signin(value)
    result = res.data
  }catch{
    result = null
  }
  return result
};




