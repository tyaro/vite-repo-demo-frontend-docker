import { Card, Grid, TextField, Box,} from '@mui/material'
import { useEffect, useState } from 'react'
import _ from 'lodash'

// interface Props{
//   SheetName:string
//   FieldName:string
//   DisplayName:string
//   InputType:string
//   DataType:string
//   Options:string
//   id:string
//   value:string
//   setValue:any
// }

export const Component = (props:any) =>{

  const [value,setValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value))
    props.setValue(event.target.value,props.id)
  }

  const width = props.Options!==""?400:360

  return(
    <>
      {/* <Card sx={{margin:1,placeContent:'center'}}> */}
      <Grid  container >
        <Grid  item sx={{marginTop:2,marginLeft:2,marginRight:1,justifyContent:'center'}}>
          <Card sx={{height:50,justifyContent:'center',textJustify:'center'}}>
          {props.props.DisplayName}
          </Card>
        </Grid>
        <Grid  item sx={{margin:2}}>
        <TextField  
        variant="outlined"
        value={value}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onChange={handleChange} />
        </Grid>
        <Grid sx={{marginLeft:0,marginTop:5}}>
        {props.Options}
        </Grid>
      </Grid>
      {/* </Card> */}
    </>
  )  
}

export default Component;
