import authService from '@service/auth/auth-service';
import ProfileView from './profile-view';

const Profile = async () => {
    const data = await authService.getMe();
    return <ProfileView qrcode_data={data} />;
};

export default Profile;
