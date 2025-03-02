import { Link } from '@i18n/routing';
import styles from './service.module.scss';

import WithAnimate from '@components/animation/with-animate';
import { socialMedias } from '@src/utils/constants';
import { FaInstagram, FaTelegramPlane, FaVk, FaWhatsapp } from 'react-icons/fa';

interface IServiceProps {
    translated: IntlMessages['Home']['Service'];
}

const Service = ({ translated }: IServiceProps) => {
    const social_media = [
        {
            path: socialMedias.telegram.path,
            icon: <FaTelegramPlane size={40} />,
        },
        {
            path: socialMedias.whatsApp.path,
            icon: <FaWhatsapp size={40} />,
        },
        {
            path: socialMedias.vk.path,
            icon: <FaVk size={40} />,
        },
        {
            path: socialMedias.instagram.path,
            icon: <FaInstagram size={40} />,
        },
    ];

    return (
        <div className={styles.container}>
            <section className={styles.section_left}>
                <WithAnimate
                    type='both'
                    to='up'
                >
                    <div className={styles.header}>
                        <h3 className={styles.title}>{translated.title}</h3>
                        <p className={styles.subtitle}>{translated.subtitle}</p>
                    </div>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <div className={styles.social_media}>
                        <h3 className={styles.big_title}>SOYUZ.kg</h3>

                        <p className={styles.subtitle}>{translated.social_media_title}</p>
                        <div className={styles.line} />

                        <div className={styles.list}>
                            {social_media.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    target='_blank'
                                    className={styles.link}
                                >
                                    {item.icon}
                                </Link>
                            ))}
                        </div>
                        <div className={styles.line} />
                    </div>
                </WithAnimate>
            </section>
            <section className={styles.section_right}>
                <WithAnimate
                    type='fade'
                    triggerInView
                >
                    <div className={styles.child}>
                        <h5 className={styles.title}>{translated.enterprise.title}</h5>
                        <p className={styles.text}>{translated.enterprise.text}</p>
                    </div>
                </WithAnimate>

                <WithAnimate
                    type='fade'
                    triggerInView
                >
                    <div className={styles.line} />
                    <div className={styles.child}>
                        <h5 className={styles.title}>{translated.tourism.title}</h5>
                        <p className={styles.text}>{translated.tourism.text}.</p>
                    </div>
                </WithAnimate>
                <div className={styles.line} />

                <WithAnimate
                    type='fade'
                    triggerInView
                >
                    <div className={styles.child}>
                        <h5 className={styles.title}>{translated.s_club.title}</h5>
                        <p className={styles.text}>{translated.s_club.text}.</p>
                    </div>
                </WithAnimate>

                <div className={styles.line} />
                <WithAnimate
                    type='fade'
                    triggerInView
                >
                    <div className={styles.child}>
                        <h5 className={styles.title}>{translated.conclusion.title}</h5>
                        <p className={styles.text}>{translated.conclusion.text}</p>
                    </div>
                </WithAnimate>
            </section>
        </div>
    );
};

export default Service;
