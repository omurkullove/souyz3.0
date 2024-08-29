'use client';

import WithAnimate from '@components/animation/with-animate';
import HeroPages from '@components/hero-pages/hero-pages';
import { ITariff } from '@my_types/card-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MdSearchOff } from 'react-icons/md';
import { PurchaseDrawer, TariffItem } from './_components';
import styles from './tariff-plans-view.module.scss';

interface ITariffPlansViewProps {
    tariffs: ITariff[];
}

const TariffPlansView = ({ tariffs }: ITariffPlansViewProps) => {
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
                title='Наши услуги'
            />

            <div className={styles.content}>
                <WithAnimate
                    type='both'
                    to='right'
                >
                    <h5 className={styles.title}>Выберите подходящий тариф</h5>
                </WithAnimate>

                <div className={styles.tariffs_container}>
                    {tariffs && tariffs.length ? (
                        tariffs?.map((tariff) => (
                            <TariffItem
                                key={tariff.uuid}
                                onClick={handleClickTariff}
                                tariff={tariff}
                            />
                        ))
                    ) : (
                        <WithAnimate
                            type='fade'
                            styles={{ margin: '0 auto' }}
                        >
                            <p className={styles.no_tariff}>
                                <MdSearchOff size={30} />
                                На данный момент нет доступных тарифов
                            </p>
                        </WithAnimate>
                    )}
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

export default TariffPlansView;
