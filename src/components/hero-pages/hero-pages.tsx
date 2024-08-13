'use client';

import Image from 'next/image';
import styles from './hero-pages.module.scss';
import WithAnimate from '@components/animation/with-animate';

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
    | 'about-us';

interface IHeroPagesProps {
    img_key: ImageKeyType;
    title: string;
}

const path = '/images/hero-pages/';

const HeroPages = ({ img_key, title }: IHeroPagesProps) => {
    return (
        <div className={styles.container}>
            <Image
                src={`${path}${img_key}.webp`}
                alt={title}
                fill
                className={styles.img}
                priority
            />
            <WithAnimate
                type='both'
                to='up'
            >
                <h1 className={styles.title}>{title}</h1>
            </WithAnimate>
        </div>
    );
};

export default HeroPages;
