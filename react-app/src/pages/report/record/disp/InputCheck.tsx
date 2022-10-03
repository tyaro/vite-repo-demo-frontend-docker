import {  Card, Grid, TextField, Typography,} from '@mui/material'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { Checkbox } from '@mui/material'

interface Props{
  SheetName:string
  FieldName:string
  DisplayName:string
  InputType:string
  DataType:string
  Options:string
  id:string
  value:string
  setValue:any
}

export const Component = (props:{p:Props}) =>{

  const [value,setValue] = useState('')

  useEffect(()=>{
    if(!_.isUndefined(props.p.value))
    setValue(props.p.value)
  },[props.p.value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.p.setValue(event.target.checked?'1':'0',props.p.id);
  };

  return(
    <>
      <Card sx={{width:1000,margin:1}}>
      <Grid sx={{margin:1}} container >
      <Grid >
          <Checkbox 
          checked={value!=='1'?false:true}
          onChange={handleChange}
          sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
          />
        </Grid>
        <Grid sx={{marginLeft:2,marginTop:2,marginBottom:2}}>
          <Typography >
            {props.p.DisplayName}
          </Typography>
        </Grid>
      </Grid>
      </Card>
    </>
  )  
}

export default Component;
