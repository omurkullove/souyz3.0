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

    async getMe(): Promise<IResponse> {
        return requestHandler(() => API.get('/sys/users/me'));
    }

    async refreshToken(): Promise<IResponse<ITokens>> {
        return requestHandler(() => API.post('/auth/refresh-token', {}));
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

    async updateProfile({ data, path }: IUpdateProfileRequest): Promise<IResponse> {
        return requestHandler(() => API.put(`/sys/users/${path.email}`, data));
    }
}

export default new AuthService();
