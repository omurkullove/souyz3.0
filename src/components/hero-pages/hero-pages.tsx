'use client';

import WithAnimate from '@components/animation/with-animate';
import Image from 'next/image';
import { useState } from 'react';
import styles from './hero-pages.module.scss';

type ImageKeyType =
    | 'news-portal'
    | 'contacts'
    | 'digital-workshop'
    | 'faq'
    | 'labor-center'
    | 'legal-center'
    | 'partners'
    | 'reviews'
    | 'public-reception'
    | 'about-us'
    | 'profile'
    | 'tariff-plans';

interface IHeroPagesProps {
    img_key: ImageKeyType;
    title: string;
}

const path = '/images/hero-pages/';

const HeroPages = ({ img_key, title }: IHeroPagesProps) => {
    const [isImageLoading, setImageLoading] = useState(true);

    return (
        <div className={styles.container}>
            <Image
                src={`${path}${img_key}.webp`}
                alt={title}
                fill
                sizes='1000'
                className={`${styles.img} ${isImageLoading ? styles.blur : styles.remove_blur}`}
                priority
                onLoad={() => setImageLoading(false)}
            />
            <WithAnimate
                type='both'
                to='up'
                className={styles.title_block}
            >
                <h1 className={styles.title}>{title}</h1>
            </WithAnimate>
        </div>
    );
};

export default HeroPages;
