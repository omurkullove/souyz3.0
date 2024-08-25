'use client';

import { useRouter } from '@/navigation';
import { ITariff } from '@my_types/card-types';
import { useLocale } from '@providers/locale-provider';
import { useState } from 'react';
import styles from './tariff-purchase-view.module.scss';

interface ITariffPurchaseViewProps {
    tariff: ITariff;
}

const TariffPurchaseView = ({ tariff }: ITariffPurchaseViewProps) => {
    const { locale } = useLocale();
    const router = useRouter();

    // Используем состояния для хранения данных
    const [activeStep, setActiveStep] = useState(0); // Активный шаг для анимации
    const [cardDetails, setCardDetails] = useState({
        cardName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
    });

    if (!tariff) {
        router.push('/');
        return null;
    }

    const { name, description } = tariff.translates[locale];

    const handleNextStep = () => {
        // Переход к следующему шагу
        setActiveStep((prev) => prev + 1);
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.card} ${styles[`step-${activeStep}`]}`}>
                <div className={styles.tariffInfo}>
                    <h1 className={styles.title}>{name}</h1>
                    <p className={styles.description}>{description.join(' ')}</p>
                    <div className={styles.price}>
                        <span>Цена:</span> ${tariff.price}
                    </div>
                    <button
                        className={styles.nextButton}
                        onClick={handleNextStep}
                    >
                        Купить
                    </button>
                </div>

                {activeStep > 0 && (
                    <div className={styles.cardInput}>
                        <div className={styles.inputField}>
                            <label>Имя на карте:</label>
                            <div className={styles.customInput}>
                                {cardDetails.cardName || 'Введите имя'}
                            </div>
                        </div>
                        <div className={styles.inputField}>
                            <label>Номер карты:</label>
                            <div className={styles.customInput}>
                                {cardDetails.cardNumber || '**** **** **** ****'}
                            </div>
                        </div>
                        <div className={styles.inputField}>
                            <label>Срок действия:</label>
                            <div className={styles.customInput}>
                                {cardDetails.cardExpiry || 'MM/YY'}
                            </div>
                        </div>
                        <div className={styles.inputField}>
                            <label>CVC:</label>
                            <div className={styles.customInput}>{cardDetails.cardCVC || '***'}</div>
                        </div>
                        <button
                            className={styles.purchaseButton}
                            onClick={() => alert('Покупка завершена!')}
                        >
                            Подтвердить
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TariffPurchaseView;
