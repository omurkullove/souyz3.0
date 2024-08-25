import { ICardData } from './card-types';
import { IResponse, IToken, ITokens } from './main-types';

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse extends IResponse {
    data: ITokens & { user: IUser };
}

export interface ILoginFetchResponse {
    code: number;
    user: IUser;
}

export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    uuid: string;
    status: number;
    created_time: string;
    last_login_time: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_multi_login: boolean;
    roles: any[];
    card: ICardData;
    establishment: any;
}

export interface ISession extends IUser {
    session_expires: string;
}

export interface ITokenWithExpire extends IToken {
    session_expires: string;
}

export interface IUpdateCookie {
    session_expires: string;
    access_token: string;
    refresh_token: string;
    user: IUser;
}

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
