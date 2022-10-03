import React from "react";
import { AuthContextType,UserType } from "../../types";

// 認証コンテキスト
const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

// useAuthContext定義
export const useAuthContext = ():AuthContextType => {
  const authContext= React.useContext<AuthContextType>(AuthContext);
  return authContext
}

type Props = {
  children: React.ReactNode
}
// 認証コンテキストプロバイダ
export const AuthContextProvider = (props:Props) => {
  const [user, setUser] = React.useState<UserType | null>(null);

  const signin = (newUser: UserType, callback: () => void) => {
    setUser(newUser);
    callback();
  }

  const signout = (callback: () => void) => {
    setUser(null);
    callback();
  }


  const value:AuthContextType = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}