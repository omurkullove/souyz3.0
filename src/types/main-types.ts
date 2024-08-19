export interface IResponse {
    code: number;
    msg: string;
    data: any;
}

export interface IToken {
    access_token: string;
    refresh_token: string;
}

export interface ITokens {
    access_token: string;
    access_token_type: string;
    access_token_expire_time: string;
    refresh_token: string;
    refresh_token_type: string;
    refresh_token_expire_time: string;
}
