import { IResponse } from '@my_types/main-types';
import { AxiosError, AxiosResponse } from 'axios';

export async function requestHandler<T>(
    requestFn: () => Promise<AxiosResponse>
): Promise<IResponse<T>> {
    try {
        const res = await requestFn();
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response?.data;
        }
        throw error;
    }
}
