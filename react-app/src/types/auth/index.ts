// ロール型定義
export const RoleType = {
  Admin: 'admin',
  Manager: 'manager',
  User: 'user',
};

export type RoleType = typeof RoleType[keyof typeof RoleType];
export const AllRoleType = Object.values(RoleType);

// ユーザー型定義
export type UserType = {
  name: string;
  role: RoleType
}

// ユーザー認証コンテキスト型定義
export type AuthContextType = {
  user: UserType | null;
  signin: (user:UserType, callback:() => void) => void;
  signout: (callback:() => void) => void;
}