'use client';

import WithAnimate from '@components/animation/with-animate';
import HeroPages from '@components/hero-pages/hero-pages';
import { withTranslate } from '@i18n/withTranslate';
import { ITariff } from '@my_types/card-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { PurchaseDrawer, TariffItem } from './_components';
import styles from './tariff-plans-view.module.scss';

interface ITariffPlansViewProps {
    tariffs: ITariff[];
    translated: IntlMessages['TariffPlans'];
}

const TariffPlansView = ({ tariffs, translated }: ITariffPlansViewProps) => {
    const [activeTariff, setActiveTariff] = useState<ITariff | null>(null);
    const [isPurchaseDrawer, setIsPurchaseDrawer] = useState(false);

    const { online_card_for_compatriots, online_tourist_map, turnkey_events } =
        translated.info_content;

    const handleClickTariff = (tariff: ITariff) => {
        setActiveTariff(tariff);
        setIsPurchaseDrawer(true);
    };

    return (
        <div className={styles.container}>
            <HeroPages
                img_key='tariff-plans'
                title={translated.title}
            />

            <div className={styles.content}>
                <div className={styles.info_content}>
                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <h2 className={styles.info_title}>{online_tourist_map.title}</h2>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <p className={styles.text}>{online_tourist_map.description}</p>
                    </WithAnimate>
                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <h3 className={styles.info_title}>
                            {online_tourist_map.what_it_gives_title}
                        </h3>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <p className={styles.text}>
                            {online_tourist_map.what_it_gives_description}
                        </p>
                    </WithAnimate>
                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <ul className={`${styles.list} ${styles.text}`}>
                            {online_tourist_map.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <h2 className={styles.info_title}>{online_card_for_compatriots.title}</h2>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <p className={styles.text}>{online_card_for_compatriots.description}</p>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <ul className={`${styles.list} ${styles.text}`}>
                            {online_card_for_compatriots.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <h2 className={styles.info_title}>{turnkey_events.title}</h2>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <p className={styles.text}>{turnkey_events.description}</p>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <p className={styles.text}>{turnkey_events.description_2}</p>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <h3 className={styles.info_title}>
                            {turnkey_events.festival_s_fest_2025.title}
                        </h3>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <p className={styles.text}>
                            {turnkey_events.festival_s_fest_2025.description}
                        </p>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <p className={styles.text}>{turnkey_events.festival_s_fest_2025.program}</p>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <p className={styles.text}>{turnkey_events.festival_s_fest_2025.bonus}</p>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <h3 className={styles.info_title}>
                            {turnkey_events.autumn_spring_period.title}
                        </h3>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <p className={styles.text}>
                            {turnkey_events.autumn_spring_period.description}
                        </p>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <ul className={`${styles.list} ${styles.text}`}>
                            {turnkey_events.autumn_spring_period.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <p className={styles.text}>{turnkey_events.closing}</p>
                    </WithAnimate>

                    <WithAnimate
                        type='both'
                        to='up'
                    >
                        <p className={styles.text}>{turnkey_events.bonus}</p>
                    </WithAnimate>
                </div>

                <div className={styles.tariffs_container}>
                    {tariffs && tariffs.length
                        ? tariffs?.map((tariff) => (
                              <TariffItem
                                  key={tariff.uuid}
                                  onClick={handleClickTariff}
                                  tariff={tariff}
                                  btn_label={translated.item.btn}
                              />
                          ))
                        : null}
                </div>
            </div>

            <AnimatePresence>
                {isPurchaseDrawer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: 'linear', duration: 0.7 }}
                        className={styles.purchaseWrapper}
                        onClick={() => setIsPurchaseDrawer(false)}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, translateY: 300 }}
                            style={{
                                position: 'fixed',
                                bottom: 0,
                                left: 0,
                                right: 0,
                            }}
                            animate={{
                                opacity: 1,
                                translateY: 0,
                                transition: { ease: 'backOut', duration: 1 },
                            }}
                            exit={{
                                opacity: 0,
                                translateY: 300,

                                transition: { ease: 'backIn', duration: 0.7 },
                            }}
                        >
                            <PurchaseDrawer
                                translated={translated.purchase_drawer}
                                tariff={activeTariff}
                                setIsPurchaseDrawer={setIsPurchaseDrawer}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default withTranslate(TariffPlansView, ['TariffPlans']);
