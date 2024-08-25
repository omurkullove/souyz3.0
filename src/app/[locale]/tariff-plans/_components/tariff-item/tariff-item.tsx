'use client';

import { useRouter } from '@/navigation';
import WithAnimate from '@components/animation/with-animate';
import { ITariff } from '@my_types/card-types';
import { useLocale } from '@providers/locale-provider';
import { FaRegCheckCircle } from 'react-icons/fa';
import styles from './tariff-item.module.scss';

interface ITariffItemProps {
    tariff: ITariff;
}

const TariffItem = ({ tariff }: ITariffItemProps) => {
    const { locale } = useLocale();
    const router = useRouter();

    const navigate = () => {
        router.push(`/tariff-plans/${tariff.uuid}`);
    };

    return (
        <WithAnimate
            key={tariff.uuid}
            type='both'
            to='up'
            onClick={navigate}
        >
            <div className={styles.container}>
                <p className={styles.name}>{tariff.translates[locale]?.name}</p>

                <div className={styles.features_block}>
                    {tariff.translates[locale]?.description.map((feature) => (
                        <div
                            key={feature}
                            className={styles.feature}
                        >
                            <FaRegCheckCircle className={styles.icon} />
                            <p className={styles.label}>{feature}</p>
                        </div>
                    ))}
                </div>

                <p className={styles.cost_label}>
                    Цена: <span className={styles.cost_value}>{tariff.price} KGS</span>
                </p>
            </div>
        </WithAnimate>
    );
};

export default TariffItem;
