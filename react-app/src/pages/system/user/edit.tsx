import React, { useEffect } from 'react';
import { Button, RadioGroup, FormControlLabel, FormLabel, Typography, Radio } from '@mui/material'
import _ from 'lodash';
import { RestAPI } from '../../../api/user';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box,Card,Grid } from '@mui/material';
import { SaveButton } from '../../../components/buttons/save'
import { useSnackbar } from 'notistack';
import { useNavigate,useLocation } from 'react-router-dom'
import { useCookies } from "react-cookie";
import {Md5} from 'ts-md5';

const md5 = (value:string) =>{return Md5.hashAsciiStr(value)}

interface Row{
  row:any
}

interface State{
  username:string
  role:string
  password:string
  showPassword: boolean;
  name:string
  email:string
  group:string
  position:string
}

const Component = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {row} = location.state as Row
  const [cookies, setCookie, removeCookie] = useCookies();



 // const { username } = location.state as State
//  const id = router.query.id as string
  const [values,setValues] = React.useState<State>(!!row?{
    username:row.loginid,
    role:row.role,
    password:'',
    showPassword:false,
    name:row.name,
    email:row.emamil,
    group:row.group,
    position:row.position,
  }:{
    username:'',
    role:'user',
    password:'',
    showPassword:false,
    name:'',
    email:'',
    group:'',
    position:'',
  })
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispInfo = (msg:string,status:boolean) => {
    console.log('msg',msg)

    enqueueSnackbar(
      msg,
      {
        variant:status?'success':'error',
      });
  };
  // ユーザーデータ保存
  const save = async () =>{
    try{
      let data = {}
      if(!_.isNull(row)){
        data = {
          id: row.id,
          loginid:values.username,
          role:values.role,
          name: values.name,
          email: !_.isUndefined(values.email)?values.email:'',
          crypted_password: values.password!==''?md5(values.password):'',
          group: values.group,
          position: values.position,
         }
      }else{
        data = {
          loginid:values.username,
          role:values.role,
          name: values.name,
          email: !_.isUndefined(values.email)?values.email:'',
          password: values.password!==''?md5(values.password):'',
          group: values.group,
          position: values.position,
         }
      }
      const token = cookies.token.access_token
      console.log('data/token',data,token)
      const res = !_.isNull(row)? await RestAPI.save(data,token):await RestAPI.add(data,token)
      if(!row){
        enqueueSnackbar("ユーザー:"+ res.data.loginid +"のデータを更新しました",{variant:'success'})
      }else{
        enqueueSnackbar("ユーザー:"+ res.data.loginid +"の作成に成功しました",{variant:'success'})
      }
      navigate(-1)
    }catch{
      enqueueSnackbar("ユーザー:"+values.username+"の作成に失敗しました",{variant:'error'})
     }
  };

  // パスワード表示非表示
  const handleChange =
  (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  // パスワード表示
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: ! values.showPassword,
    });
  };
  //
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClose = () => {
    navigate(-1)
  }

  return (
    <>
    <Typography sx={{fontSize:30}}>
    {row!==null?'ユーザー編集':'ユーザー新規作成'}
    </Typography>
    <Card sx={{flexGrow:1,p:1,width:550,marginTop:3}}>
      <Box sx={{ flexGrow: 1, p: 1 }}>
        <FormControl sx={{ m: 1 }} variant="filled">
        <InputLabel htmlFor="filled-adornment-username">ユーザー名</InputLabel>
        <FilledInput
          id="filled-adornment-username"
          type='text'
          value={values.username}
          onChange={handleChange('username')}
          sx={{width:300}}
        />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="filled">
        <FormLabel id="radio-group-buttons-label">権限</FormLabel>
        <RadioGroup 
          aria-label="outlined primary button group"
          defaultValue={values.role}
          row
        >
          <FormControlLabel value="admin" control={<Radio/>} label="admin" />
          <FormControlLabel value="manager" control={<Radio/>} label="manager" />
          <FormControlLabel value="user" control={<Radio/>} label="user" />
        </RadioGroup>
        </FormControl>
        </Box>
        <Box sx={{ flexGrow: 1, p: 1 }}>
        <FormControl sx={{ m: 1 }} variant="filled">
        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          sx={{widht:500}}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        </FormControl>
        </Box>
        <Box sx={{ flexGrow: 1, p: 1 }}>
        <FormControl sx={{ m: 1 }} variant="filled">
        <InputLabel htmlFor="filled-adornment-name">名前</InputLabel>
        <FilledInput
          id="filled-adornment-name"
          type='text'
          value={values.name}
          onChange={handleChange('name')}
          sx={{width:300}}
        />
        </FormControl>
        </Box>
        <Box sx={{ flexGrow: 1, p: 1 }}>
        <FormControl sx={{ m: 1 }} variant="filled">
        <InputLabel htmlFor="filled-adornment-name">メール</InputLabel>
        <FilledInput
          id="filled-adornment-email"
          type='text'
          value={values.email}
          onChange={handleChange('email')}
          sx={{width:500}}
        />
        </FormControl>
        </Box>
        <Box sx={{ flexGrow: 1, p: 1 }}>
        <FormControl sx={{ m: 1 }} variant="filled">
        <InputLabel htmlFor="filled-adornment-name">所属</InputLabel>
        <FilledInput
          id="filled-adornment-group"
          type='text'
          value={values.group}
          onChange={handleChange('group')}
          sx={{width:500}}
        />
        </FormControl>
        </Box>
        <Box sx={{ flexGrow: 1, p: 1 }}>
        <FormControl sx={{ m: 1 }} variant="filled">
        <InputLabel htmlFor="filled-adornment-name">役職</InputLabel>
        <FilledInput
          id="filled-adornment-position"
          type='text'
          value={values.position}
          onChange={handleChange('position')}
          sx={{width:500}}
        /> 
        </FormControl>
        </Box>
        <Grid container>
          <Grid item sx={{ p: 1 }}>
          <SaveButton onClick={save} />
        </Grid>
        <Grid item sx={{ p: 1 }}>
        <Button variant="outlined" color="primary" autoFocus onClick={handleClose} >
          閉じる
        </Button>
        </Grid>
        </Grid>
        </Card>
    </>
  );

};

export default Component;