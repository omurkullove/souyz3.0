'use client';

import { withTranslate } from '@i18n/withTranslate';
import dynamic from 'next/dynamic';
import { Hero, Service } from './_components';
import styles from './home-view.module.scss';

const PopUpChat = dynamic(() => import('@components/pop-up-chat/pop-up-chat'), {
    ssr: true,
});

const PartFAQ = dynamic(
    () => import('./_components/part-faq-section/part-faq'),
    { ssr: true }
);
const PromoCard = dynamic(
    () => import('./_components/promo-card-section/promo-card'),
    {
        ssr: true,
    }
);
const Stats = dynamic(() => import('./_components/stats-section/stats'), {
    ssr: true,
});

type TranslateType = IntlMessages['Home'];

const HomeView = ({ translated }: { translated: TranslateType }) => {
    return (
        <div className={styles.container}>
            <Hero translated={translated.Hero} />
            <Service translated={translated.Service} />

            <Stats translated={translated.Stats} />
            <PromoCard
                link='/public-reception'
                translated={translated.QuickConsultation}
                wallpaper='/images/home/woman.jpg'
            />
            <PartFAQ translated={translated.PartFAQ} />
            <PromoCard
                link='/about-us'
                translated={translated.Support}
                wallpaper='/images/home/safe.jpg'
            />

            <PopUpChat />
        </div>
    );
};

export default withTranslate(HomeView, ['Home']);
