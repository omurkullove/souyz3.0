'use client';

import WithAnimate from '@components/animation/with-animate';
import { useRouter } from '@i18n/routing';
import { ITariff } from '@my_types/card-types';
import { useLocale } from '@providers/locale-provider';
import { formatNumber } from '@src/utils/helpers';
import { IoCheckmarkCircle } from 'react-icons/io5';
import styles from './tariff-item.module.scss';

interface ITariffItemProps {
    tariff: ITariff;
    onClick: (tariff: ITariff) => void;
    btn_label: string;
}

const TariffItem = ({ tariff, onClick, btn_label }: ITariffItemProps) => {
    const { locale } = useLocale();
    const router = useRouter();

    const { description, name } = tariff?.translates[locale] ?? { description: [], name: '' };

    return (
        <WithAnimate
            key={tariff.uuid}
            type='both'
            to={'up'}
        >
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.price}>{formatNumber(tariff.price)} KGS</p>
                    <button
                        className={styles.buy_btn}
                        onClick={() => onClick(tariff)}
                    >
                        {btn_label}
                    </button>
                </div>
                <div className={styles.body}>
                    {description.map((item) => (
                        <div
                            className={styles.item}
                            key={item}
                        >
                            <IoCheckmarkCircle className={styles.icon} />
                            <p className={styles.label}>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </WithAnimate>
    );
};

export default TariffItem;
