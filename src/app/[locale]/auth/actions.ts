'use server';

import { IRegisterRequest, IRestorePasswordRequest } from '@my_types/auth-types';
import authService from '@service/auth/auth-service';

export async function preregisterAction(data: { email: string }) {
    return await authService.preregister(data);
}

export async function prerestoreAction(data: { email: string }) {
    return await authService.prerestore(data);
}

export async function registerAction(data: IRegisterRequest) {
    return await authService.register(data);
}

export async function restoreAction(data: IRestorePasswordRequest) {
    return await authService.restorePassword(data);
}
