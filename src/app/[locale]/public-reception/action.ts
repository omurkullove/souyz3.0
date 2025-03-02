'use server';

import counselingService from '@service/counseling/counseling-service';

export async function publicReceptionAction(data: FormData) {
    return await counselingService.publicReception(data);
}
