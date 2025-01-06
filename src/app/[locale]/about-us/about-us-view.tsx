'use client';

import WithAnimate from '@components/animation/with-animate';
import HeroPages from '@components/hero-pages/hero-pages';
import { withTranslate } from '@i18n/withTranslate';
import styles from './about-us-view.module.scss';

type TranslateType = IntlMessages['AboutUS'];

const AboutUsView = ({ translated }: { translated: TranslateType }) => {
    return (
        <div className={styles.container}>
            <HeroPages
                title={translated.title}
                img_key='about-us'
            />

            <WithAnimate
                type='both'
                to='up'
                triggerInView={false}
            >
                <div className={styles.content}>
                    <h2>{translated.aboutUs_title}</h2>
                    <p>{translated.aboutUs_text}</p>
                    <h3>{translated.mission_title}</h3>
                    <p>
                        {translated.mission_text_1}
                        <br />
                        {translated.mission_text_2}
                    </p>
                    <h3>{translated.service_title}</h3>
                    <ul>
                        <li>{translated.service_text_1}</li>
                        <li>{translated.service_text_2}</li>
                        <li>{translated.service_text_3}</li>
                        <li>{translated.service_text_4}</li>
                    </ul>
                    <h3>{translated.whyWe_title}</h3>
                    <p>{translated.whyWe_text_1}</p>
                    <p>{translated.whyWe_text_2}</p>
                </div>
            </WithAnimate>
        </div>
    );
};

export default withTranslate(AboutUsView, ['AboutUS']);
