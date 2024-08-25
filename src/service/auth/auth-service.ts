import {
    ILoginRequest,
    IRegisterRequest,
    IResetPasswordRequest,
    IRestorePasswordRequest,
    IUpdateProfileRequest,
} from '@my_types/auth-types';
import { IResponse, ITokens } from '@my_types/main-types';
import { API } from '@src/axios';
import { requestHandler } from '../request-handler';

class AuthService {
    async login(loginData: ILoginRequest): Promise<IResponse> {
        return requestHandler(() => API.post('/auth/login', loginData));
    }

    async logout(): Promise<IResponse> {
        return requestHandler(() => API.post('/auth/logout'));
    }

    async getMe(cookie: string): Promise<IResponse> {
        return requestHandler(() => API.get('/sys/users/me', { headers: { Cookie: cookie } }));
    }

    async refreshToken(cookie: string): Promise<IResponse<ITokens>> {
        return requestHandler(() =>
            API.post('/auth/refresh-token', {}, { headers: { Cookie: cookie } })
        );
    }

    async preregister(params: { email: string }): Promise<IResponse> {
        return requestHandler(() => API.post('/sys/users/pre-register', {}, { params }));
    }

    async prerestore(params: { email: string }): Promise<IResponse> {
        return requestHandler(() => API.post('/sys/users/password/pre-restore', {}, { params }));
    }

    async restorePassword(data: IRestorePasswordRequest): Promise<IResponse> {
        return requestHandler(() => API.post('/sys/users/password/restore', data));
    }

    async resetPassword(data: IResetPasswordRequest): Promise<IResponse> {
        return requestHandler(() => API.post('/sys/users/password/reset', data));
    }

    async register({ params, user }: IRegisterRequest): Promise<IResponse> {
        return requestHandler(() => API.post('/sys/users/register', user, { params }));
    }

    async updateProfile({ data, path }: IUpdateProfileRequest, cookie: string): Promise<IResponse> {
        return requestHandler(() =>
            API.put(`/sys/users/${path.email}`, data, { headers: { Cookie: cookie } })
        );
    }
}

export default new AuthService();
