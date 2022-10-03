import axios from 'axios'

export class RestAPI {
  static servername = import.meta.env.VITE_AUTH_API_SERVER

  static async list(data:any){
    const url = this.servername + data.path +'/list'    
    const access_token = data.token.access_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    const res = await axios.get(url,access_token)
    console.log('AuthAPIレスポンス','/user/list',res)
    return res
  }
  static async save(data:any){
    const url = this.servername + data.path +'/save'    
    const access_token = data.token.access_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    console.log('送信データ',url,data,access_token)
    const res = await axios.post(url,data.value,access_token)
    console.log('AuthAPIレスポンス','/save',res)
    return res  
  }
  static async add(data:any){
    const url = this.servername + data.path +'/add'    
    const access_token = data.token.access_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    console.log('送信データ',url,data,access_token)
    const res = await axios.post(url,data.value,access_token)
    console.log('AuthAPIレスポンス','/add',res)
    return res  
  }
  static async delete(data:any){
    const url = this.servername + data.path +'/delete'    
    const access_token = data.token.access_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    console.log('送信データ',url,data,access_token)
    const res = await axios.post(url,data.value,access_token)
    console.log('AuthAPIレスポンス','/delete',res)
    return res  
  }
}

