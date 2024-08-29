'use client';

import { ITariff } from '@my_types/card-types';
import { useLocale } from '@providers/locale-provider';
import { formatNumber } from '@src/utils/helpers';
import { ChangeEvent } from 'react';
import { IoMdClose } from 'react-icons/io';
import styles from './purchase-drawer.module.scss';

interface IPurchaseDrawerProps {
    tariff: ITariff | null;
    setIsPurchaseDrawer: (isPurchaseTariff: boolean) => void;
}

const PurchaseDrawer = ({ tariff, setIsPurchaseDrawer }: IPurchaseDrawerProps) => {
    const { locale } = useLocale();

    const cardFormatted = (event: ChangeEvent<HTMLInputElement>) => {
        const clearValue = event.target.value.replace(/\s+/g, '');

        let formattedValue = clearValue;
        if (/^3[47]/.test(clearValue)) {
            formattedValue = clearValue.replace(/(\d{4})(\d{6})?(\d{5})?/, (match, p1, p2, p3) =>
                [p1, p2, p3].filter(Boolean).join(' ')
            );
        } else {
            formattedValue = clearValue.replace(
                /(\d{4})(\d{4})?(\d{4})?(\d{4})?/,
                (match, p1, p2, p3, p4) => [p1, p2, p3, p4].filter(Boolean).join(' ')
            );
        }

        event.target.value = formattedValue.trim();
    };

    const formatExpiryDate = (event: ChangeEvent<HTMLInputElement>) => {
        const clearValue = event.target.value.replace(/\D+/g, '');

        const formattedValue = clearValue
            .slice(0, 2)
            .concat(clearValue.length > 2 ? '/' : '')
            .concat(clearValue.slice(2, 4));

        event.target.value = formattedValue;
    };

    if (!tariff) return;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}>Покупка и активация тарифа</p>
                <IoMdClose
                    className={styles.close_icon}
                    onClick={() => setIsPurchaseDrawer(false)}
                />
            </div>
            <div className={styles.body}>
                <div className={styles.section_1}>
                    <div className={styles.section_1_header}>
                        <p className={styles.name}>{tariff.translates[locale]?.name}</p>
                    </div>

                    <ul className={styles.keys_list}>
                        {tariff.translates[locale]?.description.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>

                    <div className={styles.section_1_footer}>
                        <p className={styles.price_label}>Стоимость:</p>
                        <p className={styles.price_value}>{formatNumber(tariff.price)} сом</p>
                    </div>
                </div>

                <div className={styles.section_2}>
                    <div className={styles.section_2_header}>
                        <p className={styles.name}>Введите платежные реквизиты</p>
                    </div>
                    <form className={styles.form}>
                        <div className={styles.form_item}>
                            <label className={styles.label}>
                                Срок действия тарифа (кол-во месяцев)
                            </label>
                            <input
                                className={styles.input}
                                inputMode='decimal'
                                placeholder='1'
                                type='number'
                                max={12}
                                min={1}
                            />
                        </div>

                        <div className={styles.form_item}>
                            <label className={styles.label}>Номер карты</label>
                            <input
                                className={styles.input}
                                type='text'
                                placeholder='1234 1234 1234 1234'
                                maxLength={19}
                                onInput={cardFormatted}
                            />
                        </div>

                        <div className={styles.form_item}>
                            <label className={styles.label}>CVC</label>
                            <input
                                className={styles.input}
                                type='text'
                                placeholder='123'
                                maxLength={3}
                            />
                        </div>

                        <div className={styles.form_item}>
                            <label className={styles.label}>Дата истечения</label>
                            <input
                                className={styles.input}
                                type='text'
                                placeholder='MM/YY'
                                onInput={formatExpiryDate}
                            />
                        </div>

                        <button className={styles.btn}>Сделать покупку</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PurchaseDrawer;
