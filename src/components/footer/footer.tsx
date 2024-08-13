'use client';

import { Link } from '@/navigation';
import styles from './footer.module.scss';

import {
    FaFacebookSquare,
    FaTwitterSquare,
    FaLinkedin,
    FaInstagramSquare,
    FaCcVisa,
    FaCcMastercard,
    FaCcPaypal,
} from 'react-icons/fa';
import WithAnimate from '@components/animation/with-animate';
import { withTranslate } from '@i18n/withTranslate';

interface IFooterProps {
    translated: IntlMessages['Footer'];
}

const Footer = ({ translated }: IFooterProps) => {
    return (
        <WithAnimate type='fade'>
            <div className={styles.container}>
                <section className={styles.section_1}>
                    <div className={styles.child_left}>
                        <p className={styles.title}>{translated.about_us}</p>
                        <Link
                            className={styles.link}
                            href={'/'}
                        >
                            {translated.company}
                        </Link>
                        <Link
                            className={styles.link}
                            href={'/'}
                        >
                            {translated.contacts}
                        </Link>
                        <Link
                            className={styles.link}
                            href={'/'}
                        >
                            {translated.review}
                        </Link>
                    </div>

                    <div className={styles.child_right}>
                        <p className={styles.title}>{translated.sn}</p>
                        <div className={styles.sn_block}>
                            <FaFacebookSquare size={30} />
                            <FaInstagramSquare size={30} />
                            <FaTwitterSquare size={30} />
                            <FaLinkedin size={30} />
                        </div>
                        <Link
                            href={'/'}
                            className={styles.link_right}
                        >
                            +996 555 888 111
                        </Link>
                        <Link
                            href={'/'}
                            className={styles.link_right}
                        >
                            souyz@gmail.com
                        </Link>
                    </div>
                </section>

                <section className={styles.section_2}>
                    <FaCcVisa className={styles.logo} />
                    <FaCcMastercard className={styles.logo} />
                    <FaCcPaypal className={styles.logo} />
                    <Link
                        href={'/'}
                        className={styles.link}
                    >
                        {translated.public_offer}
                    </Link>

                    <p className={styles.rights}>
                        2023-2024 souyz.kg
                        <br />© {translated.rights}
                    </p>
                </section>
            </div>
        </WithAnimate>
    );
};

export default withTranslate(Footer, ['Footer']);
