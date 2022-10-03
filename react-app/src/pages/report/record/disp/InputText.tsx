import { Card, Grid, TextField, Typography,} from '@mui/material'
import { useEffect, useState } from 'react'
import _ from 'lodash'

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

  // useEffect(()=>{
  //   if(!_.isUndefined(props.p.value))
  //   setValue(props.p.value)
  // },[])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    props.p.setValue(event.target.value,props.p.id)
  }

  const width = props.p.Options!==""?1000:960

  return(
    <>
      <Card sx={{margin:1,width:width}}>
      <Grid  container >
        <Grid  sx={{margin:4,marginLeft:2,marginRight:1}}>
          <Typography  sx={{textAlign:'left',width:100}} >
            {props.p.DisplayName}
          </Typography>
        </Grid>
        <Grid  sx={{margin:2}}>
        <TextField  
        variant="outlined"
        value={value}
        sx={{width:800}}
        multiline
        onChange={handleChange} />
        </Grid>
      </Grid>
      </Card>
    </>
  )  
}

export default Component;
