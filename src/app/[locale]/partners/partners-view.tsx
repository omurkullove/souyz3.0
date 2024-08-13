'use client';

import HeroPages from '@components/hero-pages/hero-pages';
import styles from './partners-view.module.scss';
import { Link } from '@/navigation';
import WithAnimate from '@components/animation/with-animate';
import { withTranslate } from '@i18n/withTranslate';
import { table } from 'console';

interface IPartnersViewProps {
    translated: IntlMessages['Partners'];
}

const PartnersView = ({ translated }: IPartnersViewProps) => {
    return (
        <div className={styles.container}>
            <HeroPages
                img_key='partners'
                title={translated.title}
            />

            <div className={styles.content}>
                <WithAnimate
                    type='both'
                    to='right'
                >
                    <h3 className={styles.title}>{translated.subtitle_1}</h3>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.text}>
                        {translated.welcome_text_1}
                        <Link
                            href={'/legal-center'}
                            className={styles.link}
                        >
                            {translated.legal_center}
                        </Link>
                        {translated.and}
                        <Link
                            href={'/public-reception'}
                            className={styles.link}
                        >
                            {translated.public_reception}
                        </Link>
                        {translated.welcome_text_2}
                    </p>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.text}>{translated.corporate_service_description}</p>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.text}>{translated.staff_proficiency}</p>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.text}>{translated.client_satisfaction}</p>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.text}>
                        {translated.service_offer_1}
                        <br />
                        <br />
                        {translated.service_offer_2}
                    </p>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.text}>{translated.director_contact}</p>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='right'
                >
                    <h3 className={styles.title}>{translated.subtitle_2}</h3>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.text}>
                        {translated.partnership_info_1}
                        <br />
                        <br />
                        {translated.partnership_info_2}
                    </p>
                </WithAnimate>
            </div>
        </div>
    );
};

export default withTranslate(PartnersView, ['Partners']);
