import cardService from '@service/card/card-service';
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import ProfileView from './profile-view';

const generateCacheKey = (cookie: string, souyz_session: string) => [
    'profile-data',
    cookie,
    souyz_session,
];

const fetchQrcode = async (cookie: string) => {
    const qrcode_data = await cardService.getQrCode(cookie);

    return qrcode_data;
};

const fetchCachedProfileData = (cookie: string, souyz_session: string) => {
    const cacheKey = generateCacheKey(cookie, souyz_session);
    return unstable_cache(() => fetchQrcode(cookie), cacheKey)();
};

const Profile = async () => {
    const access_token = cookies().get('access_token')?.value;
    const refresh_token = cookies().get('refresh_token')?.value;
    const souyz_session = cookies().get('souyz_session')?.value ?? '';

    const cookie = `access_token=${access_token}; refresh_token=${refresh_token}`;

    const { data } = await fetchCachedProfileData(cookie, souyz_session);

    return <ProfileView qrcode_data={data} />;
};

export default Profile;
