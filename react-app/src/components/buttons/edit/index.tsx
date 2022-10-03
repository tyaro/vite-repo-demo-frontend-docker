import React from "react";

import { ListItemButton,ListItemIcon } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate,useLocation } from "react-router-dom";


export const EditButton = (props:{row:any}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const url = location.pathname + '/edit'
  const handleClick = () => {
    navigate(url,{state:{row:props.row}})
  }
  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <EditOutlinedIcon />
      </ListItemIcon>
    </ListItemButton>
  )
}