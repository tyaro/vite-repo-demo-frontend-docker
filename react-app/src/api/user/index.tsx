import axios from 'axios'

export class RestAPI {
  static servername = import.meta.env.VITE_AUTH_API_SERVER

  static async list(data:any){
    const url = this.servername + '/user/list'
    const token = data.access_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.get(url,token)
    console.log('AuthAPIレスポンス','/user/list',res)
    return res
  }
  static async save(data:any,token:any){
    const url = this.servername + '/user/save'
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('送信データ',url,data,token)
    const res = await axios.post(url,data,token)
    console.log('AuthAPIレスポンス','/user/save',res)
    return res
  }
  static async add(data:any,token:any){
    const url = this.servername + '/user/create'
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('送信データ',url,data,token)
    const res = await axios.post(url,data,token)
    console.log('AuthAPIレスポンス','/user/save',res)
    return res
  }
  static async delete(data:any,token:any){
    const url = this.servername + '/user/delete'
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('送信データ',url,data,token)
    const res = await axios.post(url,data,token)
    console.log('AuthAPIレスポンス','/user/save',res)
    return res
  }
}

