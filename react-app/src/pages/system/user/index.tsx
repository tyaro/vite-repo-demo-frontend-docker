import React from "react";
import { RestAPI } from "../../../api";
import _ from 'lodash'
import { Grid, Typography } from "@mui/material";
import { DataGrid,GridToolbar,GridColDef,GridRowsProp,GridRenderEditCellParams,useGridApiContext } from "@mui/x-data-grid"
import { EditButton,DeleteButton,CreateButton } from '../../../components/buttons'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [rows,setRows] = React.useState<GridRowsProp>([])
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [cookies, setCookie, removeCookie] = useCookies();

  // Colmun定義
  const columns:GridColDef[] =  [
    { field:'loginid',
      headerName:'ユーザー名',
      width:150,
      editable:false,
      sortable:true
    },
    { field:'name',
      headerName:'名前',
      width:150,
      editable:true,
      sortable:true,
    },
    { field:'email',
      headerName:'メール',
      width:250,
      editable:false,
      sortable:false,
    },
    { field:'group',
      headerName:'所属',
      width:150,
      editable:false,
      sortable:false
    },
    {
      field:'position',
      headerName:'役職',
      width:150,
      editable:false,
      sortable:false
    },
    {
      field:'role',
      headerName:'権限',
      width:150,
      editable:false,
      sortable:false
    },
    {
      field:'action',
      headerName:'アクション',
      editable:false,
      sortable:true,
      renderCell: (params) => (
        <>
        <EditButton row={params.row}/>
        {params.row.group!=='system'?
        <DeleteButton row={params.row} result={handleDelete}/>
        :
        <></>
        }
        </>
      )
    },
  ]

  // 初期化
  React.useEffect(()=>{
    refresh()},[])

  // APIから値を取得
  const refresh = async() =>{
    const token = cookies.token
    const res = await RestAPI.list(token)
    var newValue = _.cloneDeep(res.data)
    setRows(newValue)
    console.log(rows)
  }

  const handleDelete = async (row:any) => {
    console.log('DeleteID',row.id)
    const data = {
      id:row.id,
    }
    const token = cookies.token.access_token
    const res = await RestAPI.delete(data,token)
    if(res.status===200){
      enqueueSnackbar("ユーザー:"+row.loginid+"の削除に成功しました。",{variant:'success'})
    }else{
      enqueueSnackbar("ユーザー:"+row.loginid+"の削除に失敗しました。",{variant:'error'})

    }
    console.log(res)
    refresh()

  }

  return(
    <>
    <Typography>
      ユーザー管理
      </Typography>
    <Grid sx={{marginTop:4}}>
    </Grid>
    <CreateButton Icon={PersonAddAltIcon}/>
    <Grid>
      <DataGrid 
      editMode="row"
      sx={{height:800,width:860,marginTop:2}}
      rows={rows} 
      columns={columns} 
      pageSize={100}
      rowsPerPageOptions={[100]}
      checkboxSelection
      disableSelectionOnClick
      headerHeight={30}
      rowHeight={50}
      initialState={{
        columns:{
          columnVisibilityModel:{
            email:false,
            group:false,
            position:false
          }
        }
      }}
      components={{
        Toolbar:GridToolbar
      }}/>
    </Grid>
    </>
  )
  
  
}

export default Dashboard;