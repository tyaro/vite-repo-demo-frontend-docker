import { RadioGroup,Radio, Card, Grid, TextField, Typography,InputAdornment, FormGroup,FormControlLabel} from '@mui/material'
import _ from 'lodash'
import { Checkbox } from '@mui/material'

export const ReportItem = (props:any) =>{
  function handleChange(value:any,id:any){
    props.setValue(value,id)
  }
  if(!props){
    return(<></>)
  }
  const options = props.Options.split(',')

  if(props.DataType==='数値'){
    return(
      <>
        <Card sx={{margin:1,placeContent:'center'}}> 
        <Grid  item sx={{margin:2}}>
        <TextField  
        variant="standard"
        onChange={(event)=>handleChange(event.target.value,props.id)} 
        InputProps={{
          inputMode: 'numeric', 
          startAdornment: <InputAdornment position="start">{props.DisplayName}</InputAdornment>,
          endAdornment: <InputAdornment position="start">{props.Options}</InputAdornment>,
          sx:{"& input":{textAlign:"center"}},
        }}
        />
      </Grid>
      </Card>
      </>
    )
  }
  if(props.DataType==='テキスト'){
    return(
      <Card sx={{margin:1,placeContent:'center'}}> 
      <Grid  item sx={{margin:2}}>
      <TextField  
      variant="outlined"
      label={props.DisplayName}
      onChange={(event)=>handleChange(event.target.value,props.id)} 
      fullWidth
      InputProps={{
        inputMode: 'text', 
      }}
      defaultValue=""
      placeholder=""
      />
    </Grid>
    </Card>
    )
  }
  if(props.DataType==='チェック'){
    return(
      <Card sx={{width:800,margin:1}}>
      <Grid sx={{margin:1}} container >
      <Grid >
      <FormGroup>
      <FormControlLabel control={
      <Checkbox 
      onChange={(event)=>handleChange(event.target.value,props.id)} 
      sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}/>

      } label={props.DisplayName} />
      </FormGroup>
        </Grid>
        <Grid sx={{marginLeft:2,marginTop:2,marginBottom:2}}>
          <Typography >
          </Typography>
        </Grid>
      </Grid>
      </Card>
    )  
  }
  if(props.DataType==='選択'){
    return(
      <Card sx={{width:1000,margin:1}}>
          <Grid container>
            <Grid sx={{width:150,marginTop:3,marginLeft:2}}>
              <Typography >
              {props.DisplayName}
              </Typography>
            </Grid>
            <Grid sx={{marginTop:2}}>
              <RadioGroup
                aria-labelledby="radio-buttons-group"
                defaultValue={options[0]}
                name="radio-buttons-group"
                row
                onChange={(event)=>handleChange(event.target.value,props.id)} 
                >
                {options.map((value:any,index:any)=>{
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
    )  
  }  return(
    <></>
  )
}

export default ReportItem;
