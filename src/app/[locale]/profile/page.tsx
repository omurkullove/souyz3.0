import { cookies } from 'next/headers';
import ProfileView from './profile-view';

// const generateCacheKey = (cookie: string, soyuz_session: string) => [
//     'profile-data',
//     cookie,
//     soyuz_session,
// ];

// const fetchQrcode = async (cookie: string) => {
//     const qrcode_data = await cardService.getQrCode(cookie);

//     return qrcode_data;
// };

// const fetchCachedProfileData = (cookie: string, soyuz_session: string) => {
//     const cacheKey = generateCacheKey(cookie, soyuz_session);
//     return unstable_cache(() => fetchQrcode(cookie), cacheKey)();
// };

const Profile = async () => {
    const access_token = cookies().get('access_token')?.value;
    const refresh_token = cookies().get('refresh_token')?.value;
    const soyuz_session = cookies().get('soyuz_session')?.value ?? '';

    const cookie = `access_token=${access_token}; refresh_token=${refresh_token}`;

    // const { data } = await fetchCachedProfileData(cookie, soyuz_session);

    return <ProfileView qrcode_data={''} />;
};

export default Profile;
