import { useRouter } from '@/navigation';
import { useLocale } from '@providers/locale-provider';
import { domain } from '@src/utils/constants';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { FC, useCallback, useState } from 'react';
import { FaEarthAsia } from 'react-icons/fa6';
import styles from './header-desktop.module.scss';

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

interface IProps {
    translated: IntlMessages['Header'];
}

const HeaderDesktop: FC<IProps> = ({ translated }) => {
    const [isBlockShown, setIsBlockShown] = useState(false);

    const { locale } = useLocale();
    const router = useRouter();

    const handleMouseEnter = useCallback(() => setIsBlockShown(true), []);
    const handleMouseLeave = useCallback(() => setIsBlockShown(false), []);

    const switchLocale = useCallback(
        async (newLocale: Locale) => {
            if (newLocale !== locale) {
                await fetch(`https://${domain}/api/switch-locale`, {
                    method: 'POST',
                    body: JSON.stringify({ locale: newLocale }),
                    credentials: 'include',
                });
                router.refresh();
            }
        },

        [locale]
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

            <div
                className={styles.block}
                onClick={() => router.push('/public-reception')}
            >
                <p className={styles.title}>{translated.public_reception}</p>
            </div>
        </motion.nav>
    );
};

export default HeaderDesktop;
