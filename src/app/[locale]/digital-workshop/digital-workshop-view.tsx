'use client';

import HeroPages from '@components/hero-pages/hero-pages';
import NonReadyBanner from '@components/non-ready-banner/non-ready-banner';
import styles from './digital-workshop-view.module.scss';

const DigitalWorkshopView = () => {
    return (
        <div className={styles.container}>
            <HeroPages
                img_key='digital-workshop'
                title='Цифровая мастерская'
            />

            <NonReadyBanner />
        </div>
    );
};

export default DigitalWorkshopView;
