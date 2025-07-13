export interface IRegisterDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  address: string;
}

export interface ILoginDto {
  userName: string;
  password: string;
}

export interface IUpdateRoleDto {
  userName: string;
  newRole: string;
}

export interface IAuthUser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  createdAt: Date;
  roles: string[];
}

export interface ILoginResponseDto {
  newToken: string;
  userInfo: IAuthUser;
}

export interface IAuthContextState {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user?: IAuthUser;
}

export const IAuthContextActionTypes = {
  INITIAL: "INITIAL",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
} as const;

export type IAuthContextActionTypes = keyof typeof IAuthContextActionTypes;

export interface IAuthContextAction {
  type: IAuthContextActionTypes;
  payload?: IAuthUser;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user?: IAuthUser;
  login: (userName: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    pasword: string,
    address: string
  ) => Promise<void>;
  logout: () => void;
}

export const RolesEnum = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  USER: "USER",
} as const;

export type RolesEnum = keyof typeof RolesEnum;
