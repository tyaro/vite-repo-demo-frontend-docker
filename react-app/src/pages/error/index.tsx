import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import _ from 'lodash'
import {AuthAPI} from "../../api/auth"
import { useAuthContext } from "../../contexts"

const ErrorPage = ()=> {
  const navigate = useNavigate()
  const authContext = useAuthContext()
  const authUser = authContext.user;
  const [cookies, setCookie, removeCookie] = useCookies();

  
  const handleClick = () => {
    console.log(authUser)
    if(_.isNull(authUser)){
      authContext.user = cookies.user_info
      console.log(authContext)
    }
    navigate(-2)
  }
  const handleClick2= () => {
    navigate('/')
  }
  return(
    <>
    <h1>閲覧権限がないユーザーです</h1>
    <Button onClick={handleClick}>戻る</Button>
    <Button onClick={handleClick2}>Signin</Button>
    </>
  ) 
}

export default ErrorPage;