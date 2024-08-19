import { API } from '@src/axios';
import { ILoginRequest, IRegisterData, IRegisterRequest } from '@my_types/auth-types';
import { IResponse } from '@my_types/main-types';
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

    async refreshToken(cookie: string): Promise<IResponse> {
        return requestHandler(() =>
            API.post('/auth/refresh-token', {}, { headers: { Cookie: cookie } })
        );
    }

    async preregister(params: { email: string }): Promise<IResponse> {
        return requestHandler(() => API.post('/sys/users/pre-register', {}, { params }));
    }
    async prerestore(params: { email: string }): Promise<IResponse> {
        return requestHandler(() => API.post('/sys/users/pre-register', {}, { params }));
    }

    async register({ params, user }: IRegisterRequest): Promise<IResponse> {
        return requestHandler(() => API.post('/sys/users/register', user, { params }));
    }
}

export default new AuthService();
