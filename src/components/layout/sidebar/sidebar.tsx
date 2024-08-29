'use client';

import { Link, usePathname, useRouter } from '@/navigation';
import WithAnimate from '@components/animation/with-animate';
import { withTranslate } from '@i18n/withTranslate';
import { useUser } from '@providers/user-provider';
import { motion, Variants } from 'framer-motion';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { FaLongArrowAltRight, FaMoon, FaSun } from 'react-icons/fa';
import styles from './sidebar.module.scss';

interface ISidebarProps {
    mode: ModeType;
    translated: IntlMessages['Sidebar'];
}

const variants = {
    hidden: {
        opacity: 0,
        x: -10,
        paddingLeft: 0,
        paddingRight: 0,
    },

    visible: {
        opacity: 1,
        x: 0,
        paddingLeft: 10,
        paddingRight: 10,
    },
} as Variants;

const Sidebar = ({ mode, translated }: ISidebarProps) => {
    const { user } = useUser();
    const router = useRouter();
    const path = usePathname();

    const handleSetThemeToCookie = () => {
        const theme = mode === 'light' ? 'dark' : 'light';
        Cookies.set('mode', theme, { expires: 30, path: '/' });
        router.refresh();
    };

    return (
        <div className={styles.container}>
            <WithAnimate
                type='both'
                to={'right'}
            >
                <div className={styles.content}>
                    <div className={styles.header}>
                        <Link
                            href={'/'}
                            className={styles.title}
                        >
                            Souyz.KG
                        </Link>

                        <p className={styles.subtitle}>{translated.title}</p>
                    </div>
                    <div
                        className={styles.mode_block}
                        onClick={handleSetThemeToCookie}
                    >
                        <p className={styles.mode_title}>
                            {mode === 'light' ? translated.light_mode : translated.dark_mode}
                        </p>
                        {mode === 'light' ? (
                            <FaSun className={styles.mode_icon} />
                        ) : (
                            <FaMoon className={styles.mode_icon} />
                        )}
                    </div>
                    <div className={styles.line} />
                    <div className={styles.link_container}>
                        {translated.links.map((item, index) => {
                            const isActive =
                                item.path === path || (path.includes('/auth') && index == 0);
                            const isLast = index === translated.links.length - 1;

                            return (
                                <Link
                                    className={styles.link}
                                    href={item.path}
                                    target={item.target}
                                    key={item.label}
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <motion.div
                                        className={`${styles.link_block} ${
                                            isActive && styles.active
                                        }`}
                                        initial={'hidden'}
                                        whileHover={isActive ? 'hidden' : 'visible'}
                                    >
                                        <motion.div
                                            variants={variants}
                                            className={styles.icon}
                                        >
                                            <FaLongArrowAltRight />
                                        </motion.div>

                                        <p className={styles.label}>
                                            {index === 0 && user
                                                ? `${user.first_name} ${user.last_name}`
                                                : item.label}
                                        </p>
                                    </motion.div>
                                    {isLast && <div className={styles.beta_line}>Beta</div>}
                                </Link>
                            );
                        })}
                        <div className={styles.line} />
                    </div>

                    <div className={styles.footer}>
                        <Image
                            src={'/images/footer/souyz-logo.png'}
                            alt='souyz-logo.png'
                            width={100}
                            height={50}
                        />

                        <p className={styles.text}>{translated.footer_text}</p>
                    </div>
                </div>
            </WithAnimate>
        </div>
    );
};

export default withTranslate(Sidebar, ['Sidebar']);
