'use client';

import { useCallback, useEffect, useState } from 'react';
import styles from './hero.module.scss';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import WithAnimate from '@components/animation/with-animate';

const slideshowPaths = [
    '/images/home/slide-show/1.webp',
    '/images/home/slide-show/2.webp',
    '/images/home/slide-show/3.webp',
];

interface IHeroProps {
    translated: IntlMessages['Home']['Hero'];
}

const Hero = ({ translated }: IHeroProps) => {
    const [activePathIndex, setActivePathIndex] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const handleInView = useCallback(() => {
        if (isFirstRender) setIsFirstRender(false);

        if (inView) {
            if (!intervalId) {
                const id = setInterval(() => {
                    setActivePathIndex((prev) => (prev + 1) % slideshowPaths.length);
                }, 10000);
                setIntervalId(id);
            }
        } else {
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        }
    }, [inView, intervalId]);

    useEffect(() => {
        handleInView();
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [inView]);

    return (
        <div
            className={styles.container}
            ref={ref}
        >
            <AnimatePresence>
                {slideshowPaths.map(
                    (image, index) =>
                        index === activePathIndex && (
                            <motion.div
                                className={styles.slideshow_item}
                                key={activePathIndex}
                                initial={!isFirstRender && { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0.5 }}
                                transition={{ duration: 1.5 }}
                                style={{
                                    backgroundImage: `url(${image})`,
                                }}
                            />
                        )
                )}
            </AnimatePresence>

            <WithAnimate
                to='up'
                type='both'
            >
                <h1 className={styles.title}>{translated.title}</h1>
            </WithAnimate>
        </div>
    );
};

export default Hero;
