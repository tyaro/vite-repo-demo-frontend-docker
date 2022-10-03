import React from "react";

import { ListItemButton,ListItemIcon } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmDialog from '../../dialogs/yesno'

export const DeleteButton = (props:{row:any,result:any}) => {
  const [open,setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(true)
  }
  const handleResult=(result:boolean)=>{
    if(result){
      props.result(props.row)
    }
    setOpen(false)
  }

  return (
    <>
    <ConfirmDialog open={open} msg='削除しますか？' result={handleResult} />
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <DeleteForeverIcon />
      </ListItemIcon>
    </ListItemButton>
    </>
  )
}