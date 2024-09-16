'use client';

import WithAnimate from '@components/animation/with-animate';
import HeroPages from '@components/hero-pages/hero-pages';
import { withTranslate } from '@i18n/withTranslate';
import { useUser } from '@providers/user-provider';
import { Logout, UpdatePassword, UpdateProfile } from './_components';
import styles from './profile-view.module.scss';

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

interface IProfileViewProps {
    qrcode_data: string;
    translated: IntlMessages['Profile'];
}

const ProfileView = ({ qrcode_data, translated }: IProfileViewProps) => {
    const { user } = useUser();

    return (
        <div className={styles.container}>
            <HeroPages
                img_key='profile'
                title={translated.title}
            />

            <WithAnimate
                className={styles.content}
                type='both'
                to='up'
            >
                <div className={styles.info_container}>
                    <div className={styles.info_block}>
                        <h3 className={styles.fullName}>
                            {user?.last_name} {user?.first_name}
                        </h3>

                        <p className={styles.label}>
                            {translated.email} <span className={styles.value}>{user?.email}</span>
                        </p>

                        <p className={styles.label}>
                            {translated.phone}{' '}
                            <span className={styles.value}>{user?.phone.replace('tel:', '')}</span>
                        </p>

                        <p className={styles.label}>
                            {translated.created_account_date}{' '}
                            <span className={styles.value}>
                                {formatDate(user?.created_time || '')}
                            </span>
                        </p>
                    </div>

                    <div className={styles.footer}>
                        <UpdateProfile translated={translated.update_profile} />
                        <UpdatePassword translated={translated.update_password} />
                    </div>
                </div>

                <Logout translated={translated.logout} />
            </WithAnimate>
        </div>
    );
};

export default withTranslate(ProfileView, ['Profile']);
