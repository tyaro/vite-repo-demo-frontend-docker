import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuthContext } from '../../contexts';
import { AuthContextType } from '../../types';
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useCookies } from "react-cookie";

const Component = () => {
  const authUser:AuthContextType = useAuthContext();
  const [open,setOpen] = React.useState(false)
  const {enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate()

  const handleNo = () => {
    setOpen(false)
  }
  const handleYes = () => {
    console.log('singout')
    removeCookie("token")
    removeCookie("user_info")
    navigate('/')
  }

  const renderConfirmDialog = () => {
    return (
      <Dialog
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>確認</DialogTitle>
        <DialogContent dividers>
          ログアウトしますか？
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };
  return(
    <>
     {renderConfirmDialog()}
      <Box sx={{marginRight:2}}>
        {authUser.user?.name} 
      </Box>
      <Button variant="outlined" onClick={()=>setOpen(true)}>LOGOUT</Button>
    </>
  )
}

export default Component;