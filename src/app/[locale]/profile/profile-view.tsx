'use client';

import Image from 'next/image';
import styles from './profile-view.module.scss';
import HeroPages from '@components/hero-pages/hero-pages';
import { useUser } from '@providers/user-provider';
import WithAnimate from '@components/animation/with-animate';
import { pushAndRefresh, toastPusher, universalFetcher } from '@src/utils';
import authService from '@service/auth/auth-service';
import { useLocale } from '@providers/locale-provider';

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

const ProfileView = () => {
    const { user, updateUser } = useUser();
    const { locale } = useLocale();

    const onSuccess = async () => {
        await fetch('/api/clear-cookie', {
            method: 'POST',
            credentials: 'include',
        });
        pushAndRefresh(`/${locale}`);
        updateUser(null);
    };

    const logoutFetcher = async () => {
        return universalFetcher({
            requestFn: async () => await authService.logout(),
            successAction: onSuccess,
        });
    };

    const handleLogout = () => {
        toastPusher(logoutFetcher(), {
            error: {
                default: 'Ошибка при выходе из аккаунта',
            },
            loading: 'Выход из аккаунта...',
            success: 'Вы успешно вышли из аккаунта',
        });
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/images/qr-code-test.png';
        link.download = 'user-qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.container}>
            <HeroPages
                img_key='profile'
                title='Профиль'
            />

            <WithAnimate
                className={styles.content}
                type='both'
                to='up'
            >
                <div className={styles.qr_block}>
                    <Image
                        src={'/images/qr-code-test.png'}
                        width={300}
                        height={300}
                        className={styles.image}
                        alt='qr-code'
                    />

                    <button
                        className={styles.download_btn}
                        onClick={handleDownload}
                    >
                        Загрузить QR-код
                    </button>
                </div>
                <div className={styles.info_container}>
                    <div className={styles.info_block}>
                        <h3 className={styles.fullName}>
                            {user?.last_name} {user?.first_name}
                        </h3>

                        <p className={styles.label}>
                            Почта: <span className={styles.value}>{user?.email}</span>
                        </p>

                        <p className={styles.label}>
                            Номер телефона:{' '}
                            <span className={styles.value}>{user?.phone.replace('tel:', '')}</span>
                        </p>

                        <p className={styles.label}>
                            Дата создания аккаунта:{' '}
                            <span className={styles.value}>
                                {formatDate(user?.created_time || '')}
                            </span>
                        </p>

                        <p className={styles.label}>
                            Дата истечения токена:{' '}
                            <span className={styles.value}>{user?.session_expires}</span>
                        </p>
                    </div>

                    <button
                        className={styles.logout}
                        onClick={handleLogout}
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </WithAnimate>
        </div>
    );
};

export default ProfileView;
