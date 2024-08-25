import { IResponse } from '@my_types/main-types';
import { AxiosError, AxiosResponse } from 'axios';

export async function requestHandler<T>(
    requestFn: () => Promise<AxiosResponse>
): Promise<IResponse> {
    try {
        const res = await requestFn();
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error?.response?.data, error?.config?.url);
            return error?.response?.data;
        }
        throw error;
    }
}
