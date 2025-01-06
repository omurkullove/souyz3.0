'use client';

import WithAnimate from '@components/animation/with-animate';
import HeroPages from '@components/hero-pages/hero-pages';
import { withTranslate } from '@i18n/withTranslate';
import styles from './partners-view.module.scss';

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
                    <h3 className={styles.title}>{translated.welcome_title}</h3>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.text}>{translated.intro_text}</p>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.title}>{translated.why_partner_title}</p>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <ol className={styles.list}>
                        {translated.why_partner_list.map((item, index) => (
                            <li
                                key={index}
                                className={styles.text}
                            >
                                <b>{item.title} </b>
                                {item.text}
                            </li>
                        ))}
                    </ol>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.title}>{translated.collaboration_title}</p>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <ol className={styles.list}>
                        {translated.collaboration_list.map((step, index) => (
                            <li
                                key={index}
                                className={styles.text}
                            >
                                {step}
                            </li>
                        ))}
                    </ol>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.text}>{translated.closing_text}</p>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.text}>{translated.contact_text}</p>
                </WithAnimate>

                <WithAnimate
                    type='both'
                    to='up'
                >
                    <p className={styles.text}>{translated.future_text}</p>
                </WithAnimate>
            </div>
        </div>
    );
};

export default withTranslate(PartnersView, ['Partners']);
