import { ThemeProvider,createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Card, Typography,Box,TextField } from "@mui/material";
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from 'notistack';
import { useCookies } from "react-cookie";
import { useAuthContext } from "../../contexts";
import { AuthContextType } from "../../types";
import { Authentication,Signin } from "../../components/auth";
import {Md5} from 'ts-md5';
import Background from '../../template/background'

const md5 = (value:string) =>{return Md5.hashAsciiStr(value)}

const darkTheme = createTheme({
  palette:{
    mode:'dark',
  }
})

interface IFormValues {
  username?: string;
  password?: string;
}

const Component = () => {

  const navigate = useNavigate();
  const location= useLocation();
  const authUser:AuthContextType = useAuthContext();

  const {t} = useTranslation()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { register, handleSubmit } = useForm<IFormValues>();
  const [cookies, setCookie, removeCookie] = useCookies();
 

  
  
  // 認証処理
  const authentication = async (value: IFormValues) => {
    const token = await Authentication(value)
    if(token!==null){
      setCookie('token',token)
      enqueueSnackbar(t("signin.authentication.success","認証に成功しました"),{variant:"success"})
    }else{
      enqueueSnackbar(t("signin.authentication.error","認証に失敗しました"),{variant:"error"})
      return
    }
    const userInfo = await Signin(token)
    if(userInfo!=null){
      setCookie('user_info',userInfo)
      enqueueSnackbar(t("signin.success2","ユーザー情報の取得に成功しました。"),{variant:"success"})
      authUser.signin(userInfo, () => { 
        navigate('/home', { replace: true })
      });
    }else{
      enqueueSnackbar(t("signin.error2","ユーザー情報の取得に失敗しました"),{variant:"error"})
    }
  };


  return (
    <>
    <ThemeProvider theme={darkTheme}>
    <Background />
      <CssBaseline />
      <Box sx={{display:'flex',position:'absolute',top:'50%',left:'50%',transform:'translate(-50% ,-50%)'}}>
        <Card sx={{width:500,height:500,placeItems:'center',alignItems:'center',justifyContent:'center'}}>
          <Typography sx={{fontSize:50,textAlign:'center',margin:4}}>{t("system.name")}</Typography>
          <div style={{ textAlign: "center" }}>
          <form onSubmit={handleSubmit(authentication)}>
            <input name="csrfToken" type="hidden"  />
            <Box sx={{display:'flex',justifyContent:'center',marginTop:4}}>
            <TextField
              {...register("username", { required: true })}
              id="username"
              label={t("singin.username","ユーザー名")}
              variant="outlined"
              style={{
                marginBottom: "1rem",
                width:300,
              }}
            />
            </Box>
            <Box sx={{display:'flex',justifyContent:'center',margin:2}}>
            <TextField
              {...register("password", {setValueAs: (value) => md5(value)})}
              // {...register("password", {setValueAs: (value) => (value)})}
              id="password"
              label={t("singin.password","パスワード")}
              variant="outlined"
              type="password"
              style={{
                marginBottom: "1rem",
                width:300,
              }}
            />
            </Box>
            <Box sx={{display:'flex',justifyContent:'center',margin:4}}>
              <Button
                variant="contained"
                sx={{
                  marginBottom: "1rem",
                  width:300,
                  height:50,
                  fontSize:20,
                }}
                type="submit"
              >
                {t("singin.singin","サインイン")}
              </Button>
              </Box>
          </form>
        </div>
        </Card>
      </Box>
    </ThemeProvider>
    </>
  );
};

export default Component;