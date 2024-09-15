'use client';

import WithAnimate from '@components/animation/with-animate';
import HeroPages from '@components/hero-pages/hero-pages';
import { withTranslate } from '@i18n/withTranslate';
import { useLocale } from '@providers/locale-provider';
import { useUser } from '@providers/user-provider';
import { decodeBase64ToDataURL } from '@src/utils/helpers';
import Image from 'next/image';
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
    const { locale } = useLocale();
    const { user } = useUser();

    const qrCodeDataUrl = decodeBase64ToDataURL(qrcode_data ?? '');

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
                <div className={styles.qr_block}>
                    <div className={styles.image}>
                        <Image
                            src={qrCodeDataUrl}
                            fill
                            sizes='600'
                            alt='qr-code'
                        />
                    </div>
                </div>
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

            {/* {user?.card && (
                <>
                    <WithAnimate
                        type='both'
                        to='right'
                    >
                        <p className={styles.my_cards_title}>{translated.my_card}</p>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                        className={styles.card_info}
                    >
                        <div className={styles.header}>
                            <h2 className={styles.title}>
                                {user.card.tariff.translates[locale]?.name}
                            </h2>
                        </div>
                        <div className={styles.body}>
                            {user.card.tariff.translates[locale]?.description.map((feature) => (
                                <p
                                    key={feature}
                                    className={styles.feature}
                                >
                                    – {feature}
                                </p>
                            ))}
                        </div>

                        <div className={styles.footer}>
                            <p className={styles.label}>
                                {translated.status_label}
                                <span
                                    className={styles.value}
                                    data-status={user.card.status ? 'active' : 'inactive'}
                                >
                                    {user.card.status
                                        ? translated.status_active
                                        : translated.status_nonactive}
                                </span>
                            </p>

                            <p className={styles.label}>
                                {translated.expire_label}
                                <span className={styles.value}>
                                    {formatDate(user.card.expire_date)}
                                </span>
                            </p>
                        </div>
                    </WithAnimate>
                </>
            )} */}
        </div>
    );
};

export default withTranslate(ProfileView, ['Profile']);
