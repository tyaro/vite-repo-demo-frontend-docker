import {  DataGrid,GridColDef,GridSelectionModel,GridToolbar } from '@mui/x-data-grid';
import { Box,Typography,Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import _ from 'lodash'
// import Edit from './Edit'
import {RestAPI} from '../../../api/rest'
import { useCookies } from 'react-cookie'
import PostAddIcon from '@mui/icons-material/PostAdd';
import { EditButton,DeleteButton,CreateButton } from '../../../components/buttons'
import { useSnackbar } from 'notistack';

function NewRow(id:number){
  const row = {
    id:id,
    name:"",
    template_file:"",
    settings:"",
    created_at:"",
    updated_at:"",
  }
  return row
}

// レポートリスト
const Component = () => {
  const [rows,setRows] = useState<any>([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const path = '/report/setting'
  useEffect(()=>{refresh()},[])

  async function refresh(){
    const value = {
      path:path,
      token: cookies.token
    }
    const res = await RestAPI.list(value)
    var data = res.data
    if(data.length!==0)
      setRows(data)
  }

  const handleDelete = async (row:any) => {
    console.log('DeleteID',row.uuid)
    const token = cookies.token
    const data = {
      token:token,
      path:path,
      value:row,
    }
    const res = await RestAPI.delete(data)
    if(res.status===200){
      enqueueSnackbar("ユーザー:"+row.loginid+"の削除に成功しました。",{variant:'success'})
    }else{
      enqueueSnackbar("ユーザー:"+row.loginid+"の削除に失敗しました。",{variant:'error'})

    }
    console.log(res)
    refresh()

  }
  // グリッド項目定義
  const columns: GridColDef[] = [
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
    {
      field: 'name',
      headerName: 'レポート名称',
      width: 200,
      sortable: true,
      editable: false,
    },
    {
      field: 'template_file',
      headerName: 'テンプレートファイル',
      width: 400,
      sortable: true,
      editable: false,
    },
    {
      field: 'created_at',
      headerName: '登録日',
      width: 200,
      sortable: true,
      editable: false,
    },
  ];

  return(
    <>
      <Typography>
      レポート設定
      </Typography>
    <Grid sx={{marginTop:4}} container>
    <CreateButton Icon={PostAddIcon}/>
    </Grid>
      <Box sx={{height: 800,marginTop:2,padding:0,margin:0,width:1000}}>
      <DataGrid
        sx={{marginTop:2}}
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        headerHeight={30}
        rowHeight={50}
        //processRowUpdate={updateRow}
        //onProcessRowUpdateError={(params)=>{console.log('Error',params)}}
        onSelectionModelChange={(v)=>{
          setSelectionModel(v.slice(-1))
        }}
        selectionModel={selectionModel}
        components={{
          Toolbar:GridToolbar
        }}
        
      />
    </Box>
    </>
  )

}

export default Component;
