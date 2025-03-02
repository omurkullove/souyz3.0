import { ConfirmModal } from '@components/modal';
import { useLocale } from '@providers/locale-provider';
import { LOCAL_API_URL } from '@src/utils/constants';
import { pushAndRefresh, toastPusher, universalFetcher } from '@src/utils/helpers';
import { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { logoutAction } from '../../actions';
import styles from './logout.module.scss';

interface ILogoutProps {
    translated: IntlMessages['Profile']['logout'];
}

const Logout = ({ translated }: ILogoutProps) => {
    const [isConfLogout, setIsConfLogout] = useState(false);
    const { locale } = useLocale();

    const onSuccess = async () => {
        await fetch(`${LOCAL_API_URL}/clear-session`, {
            method: 'POST',
            credentials: 'include',
        });
        pushAndRefresh(`/${locale}`);
    };

    const logoutFetcher = async () => {
        return universalFetcher({
            requestFn: async () => await logoutAction(),
            successAction: async () => onSuccess(),
            delay: true,
        });
    };

    const handleLogout = () => {
        toastPusher(logoutFetcher(), {
            error: {
                default: translated.messages.error,
            },
            loading: translated.messages.loading,
            success: translated.messages.success,
        });
    };

    return (
        <>
            <FaSignOutAlt
                className={styles.logout_icon}
                onClick={() => setIsConfLogout(true)}
            />

            <ConfirmModal
                cancel_btn_text={translated.cancel_btn_text}
                confirm_btn_text={translated.confirm_btn_text}
                isOpen={isConfLogout}
                modalKey='logout-modal'
                onClose={() => setIsConfLogout(false)}
                onConfirm={handleLogout}
                subtitle={translated.subtitle}
                title={translated.title}
            />
        </>
    );
};

export default Logout;
