'use client';

import { useRouter } from '@/navigation';
import { SidebarMobile } from '@components/layout/sidebar';
import { useLocale } from '@providers/locale-provider';
import { FETCH_API_RL } from '@src/utils/constants';
import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { FC, useCallback, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { GrMenu } from 'react-icons/gr';
import styles from './header-mobile.module.scss';

interface IProps {
    mode: ModeType;
}

const header_variants = {
    hidden: {
        opacity: 0,
        translateY: -80,
    },
    visible: {
        opacity: 1,
        translateY: 0,
        transition: { duration: 0.5 },
    },
};

const HeaderMobile: FC<IProps> = ({ mode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { locale } = useLocale();

    const router = useRouter();

    const handleSetThemeToCookie = () => {
        const theme = mode === 'light' ? 'dark' : 'light';
        Cookies.set('mode', theme, { expires: 30, path: '/' });
        router.refresh();
    };

    const switchLocale = useCallback(
        async (newLocale: Locale) => {
            if (newLocale !== locale) {
                await fetch(`${FETCH_API_RL}/api/switch-locale`, {
                    method: 'POST',
                    body: JSON.stringify({ locale: newLocale }),
                    credentials: 'include',
                });
                router.refresh();
            }
        },

        [locale]
    );

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <>
            <motion.nav
                variants={header_variants}
                initial={'hidden'}
                animate='visible'
                className={styles.container}
            >
                <p
                    className={styles.title}
                    onClick={() => router.push('/')}
                >
                    Soyuz.KG
                </p>

                <div className={styles.menu_block}>
                    {mode === 'light' ? (
                        <FaSun
                            className={styles.mode_icon}
                            onClick={handleSetThemeToCookie}
                        />
                    ) : (
                        <FaMoon
                            className={styles.mode_icon}
                            onClick={handleSetThemeToCookie}
                        />
                    )}
                    {locale === 'ru' ? (
                        <button
                            className={styles.change_locale}
                            onClick={() => switchLocale('kg')}
                        >
                            RU
                        </button>
                    ) : (
                        <button
                            className={styles.change_locale}
                            onClick={() => switchLocale('ru')}
                        >
                            KG
                        </button>
                    )}

                    <GrMenu
                        className={styles.menu_icon}
                        onClick={toggleSidebar}
                    />
                </div>
            </motion.nav>

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        onClick={toggleSidebar}
                        className={styles.sidebar_wrapper}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{ ease: 'linear' }}
                    >
                        <motion.aside
                            onClick={(e) => e.stopPropagation()}
                            className={styles.sidebar}
                            initial={{
                                translateX: 200,
                                opacity: 0,
                            }}
                            animate={{
                                translateX: 0,
                                opacity: 1,
                            }}
                            exit={{
                                translateX: 200,
                                opacity: 0,
                            }}
                            transition={{ ease: 'linear', duration: 0.5 }}
                        >
                            <SidebarMobile toggleSidebar={toggleSidebar} />
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default HeaderMobile;
