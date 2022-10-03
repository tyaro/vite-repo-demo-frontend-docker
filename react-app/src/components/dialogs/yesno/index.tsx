import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect } from 'react'

  
// 変更確認ダイアログ
const ConfirmDialog = (props:{open:boolean,msg:string,result:any}) => {
  const [open,setOpen] = React.useState(props.open)

  useEffect(()=>{
    if(props.open){
      setOpen(true)
    }
  },[props.open])
  
  // Noを選択したら変更前に戻す
  const handleNo = () => {
    props.result(false)
    setOpen(false)
  };

  // Yesを選択したらデータを保存する
  const handleYes = () => {
      props.result(true)
      setOpen(false)
    }
  
  return (
    <>
    <Dialog
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>確認</DialogTitle>
      <DialogContent dividers>
        {props.msg}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNo}>
          No
        </Button>
        <Button onClick={handleYes}>Yes</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default ConfirmDialog;