import { Button, Box } from "@mui/material";
import { useNavigate,useLocation } from "react-router-dom";


export const CreateButton = (props:{Icon:any}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const url = location.pathname + '/edit'
  const handleClick = () => {
    console.log(url)
    navigate(url,{state:{row:null}})
  }
  return (
    <Button onClick={handleClick} variant='outlined' color='inherit'>
      新規作成
      <props.Icon /> 
    </Button>
  )
}