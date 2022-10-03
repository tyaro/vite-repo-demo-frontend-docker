import React from "react";

import { Button,ListItemIcon } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';


export const SaveButton = (props:{onClick:any}) => {

  return (
    <Button onClick={props.onClick} variant='outlined' color="primary">
      <SaveIcon />
      保存
    </Button>
  )
}