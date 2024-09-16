'use client';

import HeroPages from '@components/hero-pages/hero-pages';
import NonReadyBanner from '@components/non-ready-banner/non-ready-banner';
import styles from './reviews-view.module.scss';

const ReviewsView = () => {
    return (
        <div className={styles.container}>
            <HeroPages
                img_key='reviews'
                title='Отзывы'
            />

            <NonReadyBanner />
        </div>
    );
};

export default ReviewsView;
