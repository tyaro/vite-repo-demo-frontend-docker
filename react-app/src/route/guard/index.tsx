import React from "react";
import { useAuthContext } from "../../contexts"
import { RoleType } from "../../types";
import {  useLocation, Navigate } from "react-router-dom";

type Props = {
  element: React.ReactNode;
  redirect: string,
  allowroles?: RoleType[] 
}

// ルーティング制限
export const RouteAuthGuard: React.FC<Props> = (props) => {
  const authContext = useAuthContext()
  const location = useLocation()
  const authUser = authContext.user;


  // ユーザーのロールがページ閲覧権限を含んでいるか
  let allowRoute = false;
  if ( authUser ) {
    allowRoute = props.allowroles ? props.allowroles.includes(authUser.role) : true;
  }
  // 許されざる者は指定ページへ飛ばす
  if (!allowRoute) {
    return <Navigate to={props.redirect} state={{from:location}} replace={false} />
  }

  return <>{props.element}</>;

}