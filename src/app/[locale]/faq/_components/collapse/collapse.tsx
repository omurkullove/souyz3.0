import { LazyMotion, domAnimation, m } from 'framer-motion';
import { ReactNode } from 'react';

interface ICollapsePros {
    children: ReactNode;
    open: boolean;
}

const Collapse = ({ children, open }: ICollapsePros) => {
    const animate = {
        transition: { type: 'tween' },
        height: open ? 'auto' : 0,
    };

    return (
        <LazyMotion
            features={domAnimation}
            strict
        >
            <div aria-expanded={open}>
                <m.div
                    style={{ overflow: 'hidden' }}
                    initial={{ height: 0, opacity: 1 }}
                    animate={animate}
                    exit={{ height: 0, opacity: 1 }}
                >
                    {children}
                </m.div>
            </div>
        </LazyMotion>
    );
};

export default Collapse;
