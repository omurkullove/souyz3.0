'use client';

import styles from './home-view.module.scss';
import { withTranslate } from '@i18n/withTranslate';
import { Hero, Service, PartFAQ, PromoCard, Stats } from './_components';

type TranslateType = IntlMessages['Home'];

const HomeView = ({ translated }: { translated: TranslateType }) => {
    return (
        <div className={styles.container}>
            <Hero translated={translated.Hero} />
            <Service translated={translated.Service} />
            <Stats translated={translated.Stats} />
            <PromoCard
                link='/'
                translated={translated.QuickConsultation}
                wallpaper='/images/home/woman.jpg'
            />
            <PartFAQ translated={translated.PartFAQ} />
            <PromoCard
                link='/'
                translated={translated.Support}
                wallpaper='/images/home/safe.jpg'
            />
        </div>
    );
};

export default withTranslate(HomeView, ['Home']);
