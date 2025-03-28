'use client';

import { Link } from '@i18n/routing';
import styles from './footer.module.scss';

import WithAnimate from '@components/animation/with-animate';
import { withTranslate } from '@i18n/withTranslate';
import { socialMedias } from '@src/utils/constants';
import {
    FaCcMastercard,
    FaCcPaypal,
    FaCcVisa,
    FaInstagramSquare,
    FaTelegram,
    FaVk,
} from 'react-icons/fa';

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
                            href={'/about-us'}
                        >
                            {translated.company}
                        </Link>
                        <Link
                            className={styles.link}
                            href={'/contacts'}
                        >
                            {translated.contacts}
                        </Link>
                        {/* <Link
                            className={styles.link}
                            href={'/reviews'}
                        >
                            {translated.review}
                        </Link> */}
                    </div>

                    <div className={styles.child_right}>
                        <p className={styles.title}>{translated.sn}</p>
                        <div className={styles.sn_block}>
                            <Link
                                href={socialMedias.instagram.path}
                                target='_blank'
                            >
                                <FaInstagramSquare size={30} />
                            </Link>

                            <Link
                                href={socialMedias.telegram.path}
                                target='_blank'
                            >
                                <FaTelegram size={30} />
                            </Link>

                            <Link
                                href={socialMedias.vk.path}
                                target='_blank'
                            >
                                <FaVk size={30} />
                            </Link>
                        </div>
                        <Link
                            href={'tel:+996551888850'}
                            className={styles.link_right}
                        >
                            +996 551 888 850
                        </Link>
                        <Link
                            href={'mailto:info@soyuz.kg'}
                            target='_blank'
                            className={styles.link_right}
                        >
                            info@soyuz.kg
                        </Link>
                    </div>
                </section>

                <section className={styles.section_2}>
                    <div className={styles.icons}>
                        <FaCcVisa className={styles.logo} />
                        <FaCcMastercard className={styles.logo} />
                        <FaCcPaypal className={styles.logo} />
                    </div>
                    {/* <Link
                        href={'/'}
                        className={styles.link}
                    >
                        {translated.public_offer}
                    </Link> */}

                    <p className={styles.rights}>
                        2023-2025 soyuz.kg
                        <br />© {translated.rights}
                    </p>
                </section>
            </div>
        </WithAnimate>
    );
};

export default withTranslate(Footer, ['Footer']);
