import { ITokens } from './main-types';

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    uuid: string;
    status: number;
    is_superuser: boolean;
    is_staff: boolean;
    is_multi_login: boolean;
    created_time: string;
    last_login_time: string;
    roles: [];
    card: null;
    establishment: null;
}

export type ISession = { user: IUser } & ITokens;

export interface IRegisterData {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
}

export interface IRegisterRequest {
    params: { code: string };
    user: IRegisterData;
}

export interface IUpdateProfileData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

export interface IUpdateProfileRequest {
    path: {
        email: string;
    };

    data: IUpdateProfileData;
}

export interface IResetPasswordRequest {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

export interface IRestorePasswordRequest {
    email: string;
    code: string;
    new_password: string;
    confirm_password: string;
}
