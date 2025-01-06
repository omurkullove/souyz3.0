'use client';

import { Link } from '@/navigation';
import HeroPages from '@components/hero-pages/hero-pages';
import { withTranslate } from '@i18n/withTranslate';
import { socialMedias } from '@src/utils/constants';
import {
    FaClock,
    FaEnvelope,
    FaGlobe,
    FaMapMarkerAlt,
    FaPhone,
    FaTelegram,
    FaWhatsapp,
} from 'react-icons/fa';
import { FaTeamspeak } from 'react-icons/fa6';
import styles from './contacts-view.module.scss';

interface IContactsViewProps {
    translated: IntlMessages['Contacts'];
}

const ContactsView = ({ translated }: IContactsViewProps) => {
    const CONTACTS_ICONS = [FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaTeamspeak];

    return (
        <div className={styles.container}>
            <HeroPages
                title={translated.title}
                img_key='contacts'
            />

            <div className={styles.content}>
                {translated.items.map(({ title, value }, index) => {
                    const Icon = CONTACTS_ICONS[index];

                    return (
                        <div
                            className={styles.contact}
                            key={title}
                        >
                            <Icon className={styles.icon} />
                            <p className={styles.title}>{title}</p>
                            <p className={styles.value}>{value}</p>
                        </div>
                    );
                })}

                <div className={styles.contact}>
                    <FaGlobe className={styles.icon} />
                    <p className={styles.title}>{translated.connection_title}</p>
                    <p className={styles.value}>
                        <Link
                            href={socialMedias.telegram.path}
                            target='_blank'
                            className={styles.link}
                        >
                            <FaTelegram className={styles.sn_icon} />
                        </Link>
                        <Link
                            href={socialMedias.whatsApp.path}
                            target='_blank'
                            className={styles.link}
                        >
                            <FaWhatsapp className={styles.sn_icon} />
                        </Link>
                    </p>
                </div>

                <div className={styles.map_container}>
                    <p className={styles.title}>{translated.out_address}</p>

                    <div className={styles.map}>
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.2356845646614!2d74.60900857639507!3d42.867869371150356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c93ab55207%3A0xb0b096379bd07dd7!2zMTE5INCh0L7QstC10YLRgdC60LDRjywg0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1724424967663!5m2!1sru!2skg'
                            width='100%'
                            height='100%'
                            loading='lazy'
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withTranslate(ContactsView, ['Contacts']);
