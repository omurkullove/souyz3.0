import { IResponse } from '@my_types/main-types';
import CryptoJS from 'crypto-js';
import { ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { CRYPTO_KEY } from '../constants';

export const encrypt = (data: any) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), CRYPTO_KEY!).toString();
};

export const decrypt = (encryptedData: string) => {
    try {
        if (encryptedData) {
            const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_KEY!);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            return decryptedData;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

export const pushAndRefresh = (path: string) => {
    window.location.href = path;
};

export function toastPusher<T>(
    promise: Promise<T>,
    options: {
        loading: string;
        success: string;
        error: { [key: number]: string; default: string };
    }
) {
    toast.promise(promise, {
        loading: options.loading,
        success: options.success,
        error: (error: Error) => {
            const message = error.message;
            const statusCode = parseInt(message, 10);

            if (options.error[statusCode]) {
                return options.error[statusCode];
            }

            return options.error.default;
        },
    });
}

interface FetcherParams {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
    body?: any;
    successAction?: (data?: any) => void;
    requestFn?: (body?: any) => Promise<IResponse>;
    delay?: boolean;
    onErrorFn?: () => void;
}

export const universalFetcher = async ({
    url,
    method,
    body,
    successAction,
    requestFn,
    delay = false,
    onErrorFn,
}: FetcherParams) => {
    try {
        let response;

        if (requestFn) {
            const { code, data } = await requestFn();
            response = { code, data };
        } else if (url) {
            const res = await fetch(url, {
                method,
                body: body ? JSON.stringify(body) : undefined,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            response = await res.json();
        } else {
            throw new Error('URL is required when requestFn is not provided.');
        }

        const { code, data } = response;

        if (code === 200) {
            if (!successAction) return;

            if (delay) {
                setTimeout(() => {
                    successAction(data);
                }, 1000);
            } else {
                successAction(data);
            }
        } else {
            throw new Error(`${code}`);
        }
    } catch (error) {
        if (onErrorFn) {
            onErrorFn();
        }

        throw error;
    }
};

export const formDataFormatter = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown;

    return data;
};

export const formattedPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value.replace(/\D/g, '');
    let formattedInput = '';

    if (input.startsWith('7')) {
        formattedInput = '+7 ' + input.substring(1, 4);

        if (input.length > 4) {
            formattedInput += '-' + input.substring(4, 7);
        }
        if (input.length > 7) {
            formattedInput += '-' + input.substring(7, 9);
        }
        if (input.length > 9) {
            formattedInput += '-' + input.substring(9, 11);
        }
    } else if (input.startsWith('996')) {
        formattedInput = '+996 ' + input.substring(3, 6);

        if (input.length > 6) {
            formattedInput += '-' + input.substring(6, 8);
        }
        if (input.length > 8) {
            formattedInput += '-' + input.substring(8, 10);
        }
        if (input.length > 10) {
            formattedInput += '-' + input.substring(10, 12);
        }
    } else {
        formattedInput = '+' + input;
    }

    event.target.value = formattedInput;
};

export function decodeBase64ToDataURL(
    base64String: string,
    mimeType: string = 'image/png'
): string {
    const buffer = Buffer.from(base64String, 'base64');
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

export const formatNumber = (number: number): string => {
    return number.toLocaleString('ru-RU');
};
