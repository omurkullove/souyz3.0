'use client';

import HeroPages from '@components/hero-pages/hero-pages';
import NonReadyBanner from '@components/non-ready-banner/non-ready-banner';
import { withTranslate } from '@i18n/withTranslate';
import { ITariff } from '@my_types/card-types';
import { useState } from 'react';
import styles from './tariff-plans-view.module.scss';

interface ITariffPlansViewProps {
    tariffs: ITariff[];
    translated: IntlMessages['TariffPlans'];
}

const TariffPlansView = ({ tariffs, translated }: ITariffPlansViewProps) => {
    const [activeTariff, setActiveTariff] = useState<ITariff | null>(null);
    const [isPurchaseDrawer, setIsPurchaseDrawer] = useState(false);

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

            <NonReadyBanner />

            {/* <div className={styles.content}>
                <WithAnimate
                    type='both'
                    to='right'
                >
                    <h5 className={styles.title}>{translated.subtitle}</h5>
                </WithAnimate> */}

            {/* <div className={styles.tariffs_container}>
                    {tariffs && tariffs.length ? (
                        tariffs?.map((tariff) => (
                            <TariffItem
                                key={tariff.uuid}
                                onClick={handleClickTariff}
                                tariff={tariff}
                                btn_label={translated.item.btn}
                            />
                        ))
                    ) : (
                        <WithAnimate
                            type='fade'
                            styles={{ margin: '0 auto' }}
                        >
                            <p className={styles.no_tariff}>
                                <MdSearchOff size={30} />
                                {translated.no_tariffs}
                            </p>
                        </WithAnimate>
                    )}
                </div> */}
            {/* </div> */}

            {/* <AnimatePresence>
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
            </AnimatePresence> */}
        </div>
    );
};

export default withTranslate(TariffPlansView, ['TariffPlans']);
