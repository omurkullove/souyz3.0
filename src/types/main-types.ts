export interface IResponse<T = any> {
    code: number;
    msg: string;
    data: T;
}

export interface IPaginatedData<T = any> {
    items: T[];
    total: number;
    page: number;
    size: number;
    total_pages: number;
    links: {
        first: string;
        last: string;
        self: string;
        next: string | null;
        prev: string | null;
    };
}

export interface IPaginatedResponse<T = any> extends IResponse<IPaginatedData<T>> {}

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
