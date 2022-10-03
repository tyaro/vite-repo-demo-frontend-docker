import axios from 'axios'

export class AuthAPI {
  static servername = import.meta.env.VITE_AUTH_API_SERVER
  static async signin(data:any){
    const url = this.servername + '/token'
    let params = new URLSearchParams()
    params.append('username',data.username)
    params.append('password',data.password)
    console.log(url,params)
    const res = await axios.post(url,params)
    console.log('AuthAPIレスポンス','Login',res)
    return res
  }
  static async getUserInfo(data:any){
    const url = this.servername + '/user/me'
    const token = data.access_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.get(url,token)
    console.log('AuthAPIレスポンス','ユーザー情報',res)
    return res
  }
  static async refreshToken(data:any){
    const url = this.servername + '/RefreshToken'
    console.log('token',data.refresh_token)
    const token = data.refresh_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.get(url,token)
    console.log('AuthAPIレスポンス','RefreshToken',res)
    return res
  }
}

