'use server';

import counselingService from '@service/counseling/counseling-service';

export async function legalCenterAction(data: FormData) {
    return await counselingService.legalCenter(data);
}
