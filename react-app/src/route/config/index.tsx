import { BrowserRouter,Route, Routes } from 'react-router-dom';
import React from'react'
import { RouteAuthGuard } from '../guard';
import { RoleType } from "../../types";
import GenericTemplate from '../../template/layout'
import Login from '../../pages/signin'
import Home from '../../pages/home'
import SystemUser from '../../pages/system/user'
import SystemUserEdit from '../../pages/system/user/edit'
import Error from '../../pages/error'
import ReportConfig from '../../pages/report/config'
import ReportConfigEdit from '../../pages/report/config/edit'
import ReportRecordSelect from '../../pages/report/record/select'
import ReportRecordDisp from '../../pages/report/record/disp'

export const RouteConfig:React.FC = () =>{

  return (
    <>
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/error'} element={<Error />} />
          <Route 
            element={
              <RouteAuthGuard element={<GenericTemplate />} redirect="/error" allowroles={[RoleType.Admin,RoleType.Manager,RoleType.User]} />}>
            <Route path={'/home'} element={<Home />} />
            <Route path={'/report/record/select'} element={<ReportRecordSelect />} />
            <Route path={'/report/record/disp'} element={<ReportRecordDisp />} />
          </Route>
          <Route element={<RouteAuthGuard element={<GenericTemplate />} redirect="/error" allowroles={[RoleType.Admin]} />}>
            <Route path={'/system/user'} element={<SystemUser />} />
            <Route path={'/system/user/edit'} element={<SystemUserEdit />} />
          </Route> 
          <Route element={<RouteAuthGuard element={<GenericTemplate />} redirect="/error" allowroles={[RoleType.Admin,RoleType.Manager]} />}>
          <Route path={'/report/config'} element={<ReportConfig />} />
          <Route path={'/report/config/edit'} element={<ReportConfigEdit />} />
          </Route>     
        </Routes>
    </>
  )
}

export default RouteConfig;
