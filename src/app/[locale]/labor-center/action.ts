'use server';

import counselingService from '@service/counseling/counseling-service';

export async function laborCenterAction(data: FormData) {
    return await counselingService.laborCenter(data);
}
