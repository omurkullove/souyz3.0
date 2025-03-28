'use client';

import WithAnimate from '@components/animation/with-animate';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
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
    const [isManual, setIsManual] = useState<boolean>(false);
    const { ref, inView } = useInView({ threshold: 0 });

    const changeSlide = useCallback((nextIndex: number) => {
        setActivePathIndex(
            (nextIndex + slideshowPaths.length) % slideshowPaths.length
        );
    }, []);

    const stopSlideshow = useCallback(() => {
        setIsManual(true);
    }, []);

    const handleNext = () => {
        stopSlideshow();
        changeSlide(activePathIndex + 1);
    };

    const handlePrev = () => {
        stopSlideshow();
        changeSlide(activePathIndex - 1);
    };

    useEffect(() => {
        setActivePathIndex(getRandomIndex(0, slideshowPaths.length - 1));
    }, []);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (inView && !isManual) {
            intervalId = setInterval(() => {
                changeSlide(activePathIndex + 1);
            }, 10000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [inView, isManual, activePathIndex, changeSlide]);

    return (
        <div
            className={styles.container}
            ref={ref}
        >
            <AnimatePresence>
                <motion.div
                    className={styles.slideshow_item}
                    key={activePathIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{
                        duration: 1.5,
                        ease: [0.25, 0.8, 0.25, 1],
                    }}
                    style={{
                        backgroundImage: `url(${slideshowPaths[activePathIndex]})`,
                    }}
                />
            </AnimatePresence>

            <WithAnimate
                to='up'
                type='both'
            >
                <h1 className={styles.title}>{translated.title}</h1>
            </WithAnimate>
            <div className={styles.controls}>
                <IoIosArrowBack
                    onClick={handlePrev}
                    className={styles.control}
                />
                <IoIosArrowForward
                    onClick={handleNext}
                    className={styles.control}
                />
            </div>
        </div>
    );
};

export default Hero;
