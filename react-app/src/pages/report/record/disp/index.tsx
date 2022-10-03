import React from 'react'
//import { RESTAPI } from '../common/restapi';
import ReportItem from './ReportItem'
import _, { values } from 'lodash'
import { Grid, Typography,Box } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';
import { SaveButton } from '../../../../components';

const emptyData = {
  "SheetName": "setting",
  "FieldName": "FieldName",
  "DisplayName": "表示項目",
  "InputType": "手動入力",
  "DataType": "チェック",
  "Options": "",
  "id": "0"
}

type ReportSetting ={
  uuid:string
  name:string
  template_file:string
  settings:string
}

const Dashboard = () => {
  const [rows,setRows] = React.useState([emptyData])
  const [value,setValue] = React.useState<Array<string>>([''])
  const location = useLocation()
  const reportSetting = location.state as ReportSetting

  React.useEffect(()=>{
    if(!!reportSetting){
      const settings = JSON.parse(reportSetting.settings)
      setRows(settings)
      _.forEach(settings,(v,i)=>{
        value[Number(i)]=''
      })
      console.log('useeffect',settings)  
    }
  },[reportSetting])

  function setItemValue(v:string,id:string){
    var newValue = _.cloneDeep(value)
    newValue[Number(id)] = v
    setValue(newValue)
  }

  const debug = () =>{
    console.log(rows)
  }

  const handleSave=()=>{
    console.log('保存',value)
  }
  return(
    <>
      <Typography>
      {reportSetting.name}
      </Typography>
      <Grid container>
      <Box sx={{ flexGrow: 1, p: 1 ,width:800,marginTop:2}}>
      <SaveButton onClick={handleSave}/>
      </Box>
      <Box sx={{ flexGrow: 1, p: 1 ,width:800,marginTop:2}}>
       {rows.map((v:any,i:any)=>{
      return(
        <ReportItem 
        key={i}
        value={value[i]}
        SheetName={v.SheetName}
        FieldName={v.FieldName}
        DisplayName={v.DisplayName}
        DataType={v.DataType}
        InputType={v.InputType}
        Options={v.Options}
        id={v.id}
        setValue={setItemValue}
        />)
    })}
    </Box>
    </Grid>
    </>
  )
}

export default Dashboard;