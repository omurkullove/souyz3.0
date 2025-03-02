'use server';

import { IResetPasswordRequest } from '@my_types/auth-types';
import authService from '@service/auth/auth-service';

export async function logoutAction() {
    return await authService.logout();
}

export async function updatePasswordAction(data: IResetPasswordRequest) {
    return await authService.resetPassword(data);
}
