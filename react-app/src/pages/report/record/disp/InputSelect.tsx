import {  Card, Grid, TextField, Typography,} from '@mui/material'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { Radio,RadioGroup,FormControl,FormControlLabel } from '@mui/material'

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

  const options = props.p.Options.split(',')

  return(
    <>
      <Card sx={{width:1000,margin:1}}>
          <Grid container>
            <Grid sx={{width:150,marginTop:3,marginLeft:2}}>
              <Typography >
              {props.p.DisplayName}
              </Typography>
            </Grid>
            <Grid sx={{marginTop:2}}>
              <RadioGroup
                aria-labelledby="radio-buttons-group"
                defaultValue={options[0]}
                name="radio-buttons-group"
                row
              >
                {options.map((value,index)=>{
                  return(
                    <FormControlLabel key={value+String(index)} value={value} control={<Radio />} label={value} />
                  )
                })}
              </RadioGroup>
            </Grid>
          </Grid>
         <Grid sx={{marginLeft:2,marginTop:2,marginBottom:2}}>
      </Grid>
      </Card>
    </>
  )  
}

export default Component;
