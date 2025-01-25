'use client';

import { EmbeddedBillboard } from '@components/billboard';
import { PopUpChat } from '@components/pop-up-chat';
import { Weather } from '@components/weather-widget';
import { withTranslate } from '@i18n/withTranslate';
import { Hero, PartFAQ, PromoCard, Service, Stats } from './_components';
import styles from './home-view.module.scss';

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
            <EmbeddedBillboard />
            <PartFAQ translated={translated.PartFAQ} />
            <PromoCard
                link='/about-us'
                translated={translated.Support}
                wallpaper='/images/home/safe.jpg'
            />

            <Weather />
            <PopUpChat />
        </div>
    );
};

export default withTranslate(HomeView, ['Home']);
