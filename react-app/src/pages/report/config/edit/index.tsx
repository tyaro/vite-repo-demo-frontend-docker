import React from 'react';
import { Button, Typography, TextField } from '@mui/material'
import _ from 'lodash';
import { RestAPI } from '../../../../api/rest';
import DataGrid from './list'
import { Box,Grid } from '@mui/material';
import { SaveButton } from '../../../../components/buttons/save'
import { useSnackbar } from 'notistack';
import { useNavigate,useLocation } from 'react-router-dom'
import { useCookies } from "react-cookie";

interface Row{
  row:any
}

interface State{
  name:string
  template_file:string,
  settings:string,
}

const Component = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {row} = location.state as Row
  const [cookies, setCookie, removeCookie] = useCookies();

  const [reportName,setReportName] = React.useState<string>('')
  const [templateFile,setTemplateFile] = React.useState<string>('')
  const [settings,setSettings] = React.useState<string>('')

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(()=>{
    if(!!row){
      setReportName(row.name)
      setTemplateFile(row.template_file)
      setSettings(row.settings)
    }
  },[])

  // レポート設定保存
  const save = async () =>{
    const token = cookies.token
    const path = '/report/setting'
    let reportData = null
    if(!row){
      reportData = {
        name:reportName,
        template_file:templateFile,
        settings: settings
      }
    }else{
      reportData = {
        id:row.id,
        uuid:row.uuid,
        name:reportName,
        template_file:templateFile,
        settings: settings
      }
    }

    const data = {
      token:token,
      path:path,
      value:reportData,
    }
    try{
      const res = !row? await RestAPI.add(data): await RestAPI.save(data)
      if(res.status===200){
        enqueueSnackbar("レポート設定:"+ res.data.name +"を更新しました",{variant:'success'})
      }
    }catch{
      enqueueSnackbar("レポート設定:"+ reportData.name +"の更新に失敗しました",{variant:'error'})
    }
  };

  const getSettings = (value:string) =>{
    setSettings(value)
  }


  const handleClose = () => {
    navigate(-1)
  }

  return (
    <>
      <Typography sx={{fontSize:30}}>
      {row!==null?'レポート設定編集':'レポート新規作成'}
      </Typography>
        <Box sx={{ flexGrow: 1, p: 1 ,width:1200,marginTop:2}}>
        <TextField 
          required 
          sx={{width:300}}
          id="standard-basic" 
          label='レポート名称' 
          variant='outlined'
          InputLabelProps={{shrink: true}}
          value={reportName}
          onChange={(e)=>setReportName(e.target.value)}
        />
        </Box>
        <Box sx={{ flexGrow: 1, p: 1 }}>
        <TextField 
          required 
          sx={{width:300}}
          id="standard-basic" 
          label='テンプレートファイル' 
          variant='outlined'
          InputLabelProps={{shrink: true}}
          value={templateFile}
          onChange={(e)=>setTemplateFile(e.target.value)}
        />
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
        <Box sx={{ flexGrow: 1, p: 1,width:1100 }}>
        <DataGrid data={settings} update={getSettings} />
        </Box>
    </>
  );

};

export default Component;