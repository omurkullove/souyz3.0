'use client';

import { useState, useCallback } from 'react';
import styles from './header.module.scss';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { FaEarthAsia } from 'react-icons/fa6';
import { withTranslate } from '@i18n/withTranslate';
import { usePathname, useRouter } from '@/navigation';
import { useLocale } from '@providers/locale-provider';

type TranslateType = IntlMessages['Header'];

const variants = {
    blocks: {
        hidden: {
            opacity: 0,
            translateY: -40,
            transition: { duration: 1, ease: 'backOut' },
        },
        visible: {
            opacity: 1,
            translateY: 0,
            transition: { duration: 0.5 },
        },
    } as Variants,

    nav: {
        hidden: {
            opacity: 0,
            translateY: -80,
        },
        visible: {
            opacity: 1,
            translateY: 0,
            transition: { duration: 0.5 },
        },
    } as Variants,
};

const Header = ({ translated }: { translated: TranslateType }) => {
    const [isBlockShown, setIsBlockShown] = useState(false);

    const { locale } = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const handleMouseEnter = useCallback(() => setIsBlockShown(true), []);
    const handleMouseLeave = useCallback(() => setIsBlockShown(false), []);

    const switchLocale = useCallback(
        async (newLocale: Locale) => {
            if (newLocale !== locale) {
                await fetch('/api/switch-locale', {
                    method: 'POST',
                    body: JSON.stringify({ locale: newLocale }),
                    credentials: 'include',
                });
                router.refresh();
            }
        },

        [locale, pathname, router]
    );

    const currentLocaleText = locale === 'ru' ? translated.locale.ru : translated.locale.kg;
    const otherLocaleText = locale === 'ru' ? translated.locale.kg : translated.locale.ru;

    return (
        <motion.nav
            variants={variants.nav}
            initial={'hidden'}
            animate='visible'
            className={styles.container}
        >
            <div
                className={styles.wrapper}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={styles.block}>
                    <p className={styles.title}>{currentLocaleText}</p>
                    <FaEarthAsia className={styles.icon} />
                </div>

                <AnimatePresence mode='wait'>
                    {isBlockShown && (
                        <motion.div
                            key={locale}
                            onClick={() => switchLocale(locale === 'ru' ? 'kg' : 'ru')}
                            variants={variants.blocks}
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            className={styles.block}
                        >
                            <p className={styles.title}>{otherLocaleText}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className={styles.block}>
                <p className={styles.title}>{translated.public_reception}</p>
            </div>
        </motion.nav>
    );
};

export default withTranslate(Header, ['Header']);
