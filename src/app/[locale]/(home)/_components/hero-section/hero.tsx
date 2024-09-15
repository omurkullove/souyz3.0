'use client';

import WithAnimate from '@components/animation/with-animate';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './hero.module.scss';

const slideshowPaths = [
    '/images/home/slide-show/1.webp',
    '/images/home/slide-show/2.webp',
    '/images/home/slide-show/3.webp',
];

interface IHeroProps {
    translated: IntlMessages['Home']['Hero'];
}

const getRandomIndex = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Hero = ({ translated }: IHeroProps) => {
    const [activePathIndex, setActivePathIndex] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const { ref, inView } = useInView({ threshold: 0 });

    const handleInView = useCallback(() => {
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
        setActivePathIndex(getRandomIndex(0, slideshowPaths.length - 1));

        handleInView();
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [handleInView, intervalId]);

    return (
        <div
            className={styles.container}
            ref={ref}
        >
            <AnimatePresence>
                <motion.div
                    className={styles.slideshow_item}
                    key={activePathIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    style={{ backgroundImage: `url(${slideshowPaths[activePathIndex]})` }}
                />
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
