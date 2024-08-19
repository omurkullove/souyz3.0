import authService from '@service/auth/auth-service';
import ProfileView from './profile-view';
import { cookies } from 'next/headers';

const Profile = async () => {
    return <ProfileView />;
};

export default Profile;
