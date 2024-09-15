'use client';

import { FC, useEffect } from 'react';

interface IProps {
    setWidth: (width: number) => void;
}

const ScreenWidth: FC<IProps> = ({ setWidth }) => {
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [setWidth]);

    return null;
};

export default ScreenWidth;
