'use client';

import HeroPages from '@components/hero-pages/hero-pages';
import styles from './contacts-view.module.scss';
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaClock,
    FaGlobe,
    FaTelegram,
    FaWhatsapp,
} from 'react-icons/fa';
import { withTranslate } from '@i18n/withTranslate';

interface IContactsViewProps {
    translated: IntlMessages['Contacts'];
}

const ContactsView = ({ translated }: IContactsViewProps) => {
    const CONTACTS_ICONS = [FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock];

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
                        <FaTelegram className={styles.sn_icon} />
                        <FaWhatsapp className={styles.sn_icon} />
                    </p>
                </div>

                <div className={styles.map_container}>
                    <p className={styles.title}>{translated.out_address}</p>

                    <div className={styles.map}>
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.147395890806!2d74.61652657623482!3d42.86973300274972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7b7ac150029%3A0xeb8624254944a674!2zMTIg0YPQuy4g0JPQvtCz0L7Qu9GPLCDQkdC40YjQutC10Lo!5e0!3m2!1sru!2skg!4v1723548512533!5m2!1sru!2skg'
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
