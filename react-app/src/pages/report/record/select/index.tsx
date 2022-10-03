import { useEffect, useState } from "react";
import { RestAPI } from "../../../../api/rest";
import _ from 'lodash'
import { Button, Grid } from "@mui/material";
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";

const Component = () =>{

  const [data,setData] = useState<any>()
  // const [reportName,setReportName] = useState<Array<string>>([])
  const path = '/report/setting'
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate()

  useEffect(()=>{refresh()},[])

  // useEffect(()=>reload(),[data])

  async function refresh(){
    const value = {
      path:path,
      token: cookies.token
    }
    const res = await RestAPI.list(value)
    var data = res.data
    console.log(data)
    if(data.length!==0)
      setData(data)
  }

  // function reload(){
  //   var newValue:any = []
  //   _.forEach(data,(value)=>{
  //     newValue.push(value.name)
  //   })
  //   setReportName(newValue)
  // }

  const debug = () =>{
    console.log(data)
    // console.log(reportName)
  }

  function onClick(value:any){
    navigate('/report/record/disp',{state:value})
  }

  return(
    <>
    <Grid container>
    {!!data && data.map((value:any,index:any)=>{
      return(
        <Grid key={index} sx={{margin:4}}>
        <Button onClick={()=>onClick(value)} variant="contained" color='primary' sx={{width:150}} key={String(index)}>{value.name}</Button>
        </Grid>
      )})}
    </Grid>
    </>
  )

}

export default Component;