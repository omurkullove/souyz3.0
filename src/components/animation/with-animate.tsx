import React, { useEffect, useRef } from 'react';
import {
    motion,
    useAnimation,
    AnimatePresence,
    TargetAndTransition,
    VariantLabels,
} from 'framer-motion';

interface BaseProps {
    children: React.ReactNode;
    duration?: number;
    whileHover?: TargetAndTransition | VariantLabels;
    customVariants?: {
        hidden: object;
        visible: object;
    };
    triggerInView?: boolean;
    className?: string;
}

interface FadeProps extends BaseProps {
    type: 'fade';
    to?: never;
}

interface SlideOrBothProps extends BaseProps {
    type: 'slide' | 'both';
    to: 'up' | 'right' | 'down' | 'left';
}

type GeneralAnimatedWrapperProps = FadeProps | SlideOrBothProps;

const WithAnimate: React.FC<GeneralAnimatedWrapperProps> = ({
    children,
    type,
    to,
    duration = 0.5,
    customVariants,
    triggerInView = true,
    whileHover,
    className,
}) => {
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!triggerInView) {
            if (ref.current) {
                controls.start('visible');
            }
            return;
        }

        const handleScroll = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && ref.current) {
                    controls.start('visible');
                }
            });
        };

        const observer = new IntersectionObserver(handleScroll, { threshold: 0.3 });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls, triggerInView]);

    const getSlideVariants = (dir: 'up' | 'right' | 'down' | 'left') => {
        const variants = {
            up: { hidden: { translateY: 100 }, visible: { translateY: 0 } },
            right: { hidden: { translateX: -100 }, visible: { translateX: 0 } },
            down: { hidden: { translateY: -100 }, visible: { translateY: 0 } },
            left: { hidden: { translateX: 100 }, visible: { translateX: 0 } },
        };
        return variants[dir] || { hidden: {}, visible: {} };
    };

    const defaultVariants = {
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        slide: to ? getSlideVariants(to) : { hidden: {}, visible: {} },

        both: {
            hidden: {
                opacity: 0,
                ...(to ? getSlideVariants(to).hidden : {}),
            },
            visible: {
                opacity: 1,
                ...(to ? getSlideVariants(to).visible : {}),
            },
        },
    };

    const variants = customVariants || defaultVariants[type] || { hidden: {}, visible: {} };

    return (
        <AnimatePresence>
            <motion.div
                className={className}
                whileHover={whileHover}
                ref={ref}
                initial='hidden'
                animate={controls}
                exit='hidden'
                variants={variants}
                transition={{ duration }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default WithAnimate;
