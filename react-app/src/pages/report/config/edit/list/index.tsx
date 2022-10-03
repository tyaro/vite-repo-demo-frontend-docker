import {  DataGrid,GridColDef,GridSelectionModel,GridToolbar } from '@mui/x-data-grid';
import { Box,Button,Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import _ from 'lodash'


function NewRow(id:number){
  const rows = {
    id:id,
    FieldName:"DATA"+String(id),
    DisplayName:"",
    InputType:"手動入力",
    DataType:"チェック",
    Options:"",
    SheetName:"",
    Cell:"",
  }
  return rows
}

// 部品表リスト
const Dashboard = (props:{data:any,update:any}) => {

  const [rows,setRows] = useState<any>([NewRow(0)])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [first,setFirst] = useState(false)

  useEffect(()=>{
    if(props.data.length!==0 && !first){
      setFirst(true)
      refresh()
    }
  },[props.data])

  async function refresh(){
    if(!_.isNull(props.data)){
      console.log('refresh')
      setRows(JSON.parse(props.data))
      }
    }

  // グリッド項目定義
  const columns: GridColDef[] = [
    {
      field: 'DisplayName',
      headerName: '表示名',
      width: 400,
      sortable: true,
      editable: true,
    },
    {
      field: 'InputType',
      headerName: '入力種別',
      width: 100,
      type:'singleSelect',
      valueOptions:['手動入力','自動入力'],
      sortable: true,
      editable: true,
      // preProcessEditCellProps: (params) => {
      //   return { ...params.props};
      // },
    },
    {
      field: 'DataType',
      headerName: 'データタイプ',
      type:'singleSelect',
      valueOptions:['チェック','選択','数値','テキスト','画像'],
      sortable: true,
      editable: true,
      width: 150,
    },
    {
      field: 'SheetName',
      headerName: 'シート名',
      sortable: true,
      editable: true,
      width: 150,
    },
    {
      field: 'Cell',
      headerName: 'セル',
      sortable: true,
      editable: true,
      width: 50,
    },
    {
      field: 'Options',
      headerName: 'オプション',
      sortable: true,
      editable: true,
      width: 200,
    },
  ];

  const processRowUpdate = (
    async (newRow: any) => {
      let newValue = await _.cloneDeep(rows); 
      newValue[Number(newRow.id)] = newRow;
      setRows(newValue)
      const settings = JSON.stringify(newValue)
      // console.log('セル編集',rows,settings)
      props.update(settings)
      return newRow
    }
  );

  // IDの再振り分け
  const reindex = (values:any) => {
    _.forEach(values,(value,index)=>{
      value.id = index
      value.FieldName = 'DATA'+String(index)
    })
  }
  // 選択されている行IDの最大値
  const selectedMaxId = () => {
    var max = 0
    _.forEach(selectionModel,value=>{
      max = max > value ? max: Number(value)
    })
    return max
  }
  // 行の追加
  const addRows = () => {
    const id = (rows.length == 0)? 1 : rows.length
    var newRow = NewRow(id)
    let newValue = _.cloneDeep(rows);
    newValue.push(newRow)
    setRows(newValue)
  }
  // 行の挿入
  const insertRows = () => {
    const id = (rows.length == 0)? 1 : selectedMaxId() + 1
    //console.log("行追加:id",id)
    var newRow = NewRow(id)
    let newValue = _.cloneDeep(rows);
    _.forEach(newValue,(value,index)=>{
      if(value.id >= id){
        value.id = index+1
        value.FieldName = 'DATA'+String(index+1)
      }
    })
    newValue.push(newRow)
    newValue = _.sortBy(newValue,'id')
    setRows(newValue)
  }
  // 行の削除
  const delRows = () =>{
    console.log('selRows',selectionModel)
    if(selectionModel.length === 0) return;  
    const newValue = rows.filter((row:any) => !selectionModel.includes(row.id));
    reindex(newValue)
    //console.log('newValue',newValue)
    setRows(newValue);
  }


  return(
    <>
    <Grid sx={{textAlign:'right'}}>
      <Button variant="contained" color='success' onClick={insertRows}>行挿入</Button>
      <Button variant="contained" color='success' onClick={addRows}>行追加</Button>
      <Button variant="contained" color='success' onClick={delRows}>行削除</Button>
    </Grid>
    <Grid sx={{marginTop:0}} container>
    </Grid>
    <Box sx={{ 
      height: 800,
      marginTop:2,
      padding:0,
      margin:0,
       width: 1100,
    }}>
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
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(params)=>{console.log('Error',params)}}
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

export default Dashboard;
