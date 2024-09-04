export interface ISSOResponse {
  sub: string;
  aud: string;
  userInfo: UserInfo;
  exp: number;
  iat: number;
  jti: string;
}

export interface UserInfo {
  initials: string;
  firstName: string;
  lastName: string;
  email: string;
  staffNo: string;
  department: string;
  mobile: string;
  roles: Role[];
  token: string;
}

export interface Role {
  app: string;
  role: string;
}
export interface UserData {
  initials: string;
  userID: string;
  token: string;
  apps: App[];
  email: string;
  name: string;
}
export interface App {
  app: string;
  role: string;
}
