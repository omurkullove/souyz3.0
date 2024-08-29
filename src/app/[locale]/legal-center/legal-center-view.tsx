'use client';

import WithAnimate from '@components/animation/with-animate';
import HeroPages from '@components/hero-pages/hero-pages';
import { withTranslate } from '@i18n/withTranslate';
import { ILegalCenterRequest } from '@my_types/counseling-types';
import counselingService from '@service/counseling/counseling-service';
import { patterns } from '@src/utils/constants';
import {
    formattedPhoneNumber,
    formDataFormatter,
    toastPusher,
    universalFetcher,
} from '@src/utils/helpers';
import { FormEvent } from 'react';
import styles from './legal-center-view.module.scss';

interface ILegalCenterViewProps {
    translated: IntlMessages['LegalCenter'];
}

const LegalCenterView = ({ translated }: ILegalCenterViewProps) => {
    const submitFetcher = async (request_data: FormData) => {
        return universalFetcher({
            requestFn: async () => counselingService.legalCenter(request_data),
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = formDataFormatter(event) as ILegalCenterRequest;

        const formData = new FormData();

        formData.append('type', 'low_center');

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as string | Blob);
        });

        toastPusher(submitFetcher(formData), {
            success: 'Запрос в «Правовой центр» успешно отправлен',
            error: {
                '422': 'Введите корректный номер телефона',
                default: 'Ошибка при отправке вопроса',
            },
            loading: 'Отправляем данные...',
        });
    };

    return (
        <div className={styles.container}>
            <HeroPages
                img_key='legal-center'
                title={translated.title}
            />

            <WithAnimate
                type='both'
                to='up'
                triggerInView={false}
            >
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h5 className={styles.subtitle}>{translated.subtitle}</h5>
                        <p className={styles.text}>{translated.text}</p>
                    </div>

                    <div className={styles.keys_container}>
                        <p className={styles.keys_title}>{translated.keys_title_1}</p>
                        <ul className={styles.keys_list}>
                            {translated.keys_1.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.keys_container}>
                        <p className={styles.keys_title}>{translated.keys_title_2}</p>
                        <ul className={styles.keys_list}>
                            {translated.keys_2.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className={styles.form}
                    >
                        <div className={styles.form_item}>
                            <label
                                htmlFor='name'
                                className={styles.label}
                            >
                                {translated.name}
                            </label>
                            <input
                                type='text'
                                name='name'
                                className={styles.input}
                                autoComplete='name'
                                required
                                pattern={patterns.only_cyrillic_text}
                                title={translated.cyrillic_only}
                            />
                        </div>

                        <div className={styles.form_item}>
                            <label
                                htmlFor='phone'
                                className={styles.label}
                            >
                                {translated.phone}
                            </label>
                            <input
                                type='tel'
                                name='phone'
                                defaultValue={'+'}
                                minLength={7}
                                maxLength={64}
                                className={styles.input}
                                autoComplete='tel'
                                required
                                onInput={formattedPhoneNumber}
                            />
                        </div>

                        <div className={styles.form_item}>
                            <label
                                htmlFor='client_email'
                                className={styles.label}
                            >
                                {translated.email}
                            </label>
                            <input
                                type='email'
                                name='client_email'
                                className={styles.input}
                                autoComplete='email'
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            className={styles.submit}
                        >
                            {translated.submit_btn}
                        </button>
                    </form>
                </div>
            </WithAnimate>
        </div>
    );
};

export default withTranslate(LegalCenterView, ['LegalCenter']);
