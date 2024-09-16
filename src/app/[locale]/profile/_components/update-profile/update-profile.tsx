import { useRouter } from '@/navigation';
import { GenericModal } from '@components/modal';
import { ISession, IUpdateProfileData, IUpdateProfileRequest } from '@my_types/auth-types';
import { useUser } from '@providers/user-provider';
import { domain, patterns } from '@src/utils/constants';
import {
    formattedPhoneNumber,
    formDataFormatter,
    toastPusher,
    universalFetcher,
} from '@src/utils/helpers';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './update-profile.module.scss';

interface IUpdateProfileProps {
    translated: IntlMessages['Profile']['update_profile'];
}

const UpdateProfile = ({ translated }: IUpdateProfileProps) => {
    const [isProfileUpdate, setIsProfileUpdate] = useState(false);

    const { user, updateUser } = useUser();

    const router = useRouter();

    const onSuccessUpdate = (data: ISession) => {
        setIsProfileUpdate(false);
        updateUser(data);
        router.refresh();
    };

    const updateProfileFetcher = async (update_data_request: IUpdateProfileRequest) => {
        return universalFetcher({
            method: 'POST',
            body: JSON.stringify(update_data_request),
            url: `https://${domain}/api/update-profile`,

            successAction: (data: ISession) => onSuccessUpdate(data),
        });
    };

    const handleUpdateUserProfile = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = formDataFormatter(event) as IUpdateProfileData;

        const hasChanges =
            data.first_name !== user?.first_name ||
            data.last_name !== user?.last_name ||
            data.email !== user?.email ||
            data.phone !== user?.phone.replace('tel:', '');

        if (!hasChanges) {
            setIsProfileUpdate(false);
            toast.success(translated.messages.success);
            return;
        }

        const update_data_request: IUpdateProfileRequest = {
            path: {
                email: data.email === user?.email ? data.email : user?.email || '',
            },
            data: data,
        };

        toastPusher(updateProfileFetcher(update_data_request), {
            success: translated.messages.success,
            error: {
                default: translated.messages.error,
            },
            loading: translated.messages.loading,
        });
    };

    return (
        <>
            <button
                className={styles.btn}
                onClick={() => setIsProfileUpdate(true)}
            >
                {translated.btn_title}
            </button>

            <GenericModal
                isOpen={isProfileUpdate}
                modalKey='update-profile-modal'
                onClose={() => setIsProfileUpdate(false)}
                title={translated.modal_title}
            >
                <form
                    className={styles.form}
                    onSubmit={handleUpdateUserProfile}
                >
                    <input
                        type='text'
                        placeholder={translated.first_name}
                        name='first_name'
                        className={styles.input}
                        defaultValue={user?.first_name}
                        autoComplete='name'
                        required
                        pattern={patterns.only_cyrillic_text}
                        title={translated.cyrillic_only}
                    />
                    <input
                        type='email'
                        placeholder={translated.email}
                        name='email'
                        className={styles.input}
                        defaultValue={user?.email}
                        autoComplete='email'
                        required
                    />
                    <input
                        type='text'
                        placeholder={translated.last_name}
                        name='last_name'
                        className={styles.input}
                        autoComplete='family-name'
                        defaultValue={user?.last_name}
                        required
                        pattern={patterns.only_cyrillic_text}
                        title={translated.cyrillic_only}
                    />
                    <input
                        type='tel'
                        placeholder={translated.phone}
                        name='phone'
                        minLength={7}
                        defaultValue={user?.phone.replace('tel:', '')}
                        className={styles.input}
                        autoComplete='tel'
                        required
                        onInput={formattedPhoneNumber}
                    />

                    <div className={styles.footer}>
                        <button
                            type='reset'
                            onClick={() => setIsProfileUpdate(false)}
                        >
                            {translated.cancel}
                        </button>
                        <button type='submit'>{translated.save_changes_btn}</button>
                    </div>
                </form>
            </GenericModal>
        </>
    );
};

export default UpdateProfile;
