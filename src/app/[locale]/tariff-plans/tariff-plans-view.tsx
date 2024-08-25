'use client';

import WithAnimate from '@components/animation/with-animate';
import HeroPages from '@components/hero-pages/hero-pages';
import { ITariff } from '@my_types/card-types';
import { TariffItem } from './_components';
import styles from './tariff-plans-view.module.scss';

interface ITariffPlansViewProps {
    tariffs: ITariff[];
}

const TariffPlansView = ({ tariffs }: ITariffPlansViewProps) => {
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
                    <h5 className={styles.title}>Доступные тарифы:</h5>
                </WithAnimate>

                <div className={styles.tariffs_container}>
                    {tariffs?.map((tariff) => (
                        <TariffItem
                            key={tariff.uuid}
                            tariff={tariff}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TariffPlansView;
