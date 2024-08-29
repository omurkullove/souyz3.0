'use client';

import HeroPages from '@components/hero-pages/hero-pages';
import { withTranslate } from '@i18n/withTranslate';
import { patterns } from '@src/utils/constants';
import {
    formattedPhoneNumber,
    formDataFormatter,
    toastPusher,
    universalFetcher,
} from '@src/utils/helpers';
import styles from './public-reception-view.module.scss';

import WithAnimate from '@components/animation/with-animate';
import { FileInput } from '@components/elements';
import { IPublicReceptionRequest } from '@my_types/counseling-types';
import counselingService from '@service/counseling/counseling-service';
import { FormEvent, useState } from 'react';

interface IPublicReceptionViewProps {
    translated: IntlMessages['PublicReception'];
}

const PublicReceptionView = ({ translated }: IPublicReceptionViewProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const submitFetcher = async (data: FormData) => {
        return universalFetcher({
            requestFn: async () => await counselingService.publicReception(data),
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = formDataFormatter(event) as IPublicReceptionRequest;

        const formData = new FormData();

        formData.append('type', 'public_reception');

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'attachments') {
                formData.append(key, value as string | Blob);
            }
        });

        files.forEach((file) => {
            formData.append('attachments', file);
        });

        toastPusher(submitFetcher(formData), {
            success: 'Ваш вопрос успешно отправлен',
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
                img_key='public-reception'
                title={translated.hero_title}
            />

            <WithAnimate
                type='both'
                to='up'
                triggerInView={false}
            >
                <div className={styles.content}>
                    <p className={styles.title}>{translated.title}</p>
                    <p className={styles.subtitle}>{translated.subtitle}</p>
                    <p className={styles.keys_title}>{translated.keys_title}</p>
                    <ul className={styles.keys_list}>
                        {translated.keys.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    <p className={styles.footer_text}>{translated.footer_text}</p>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
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

                        <div className={styles.form_item}>
                            <label
                                htmlFor='description'
                                className={styles.label}
                            >
                                {translated.question}
                            </label>
                            <textarea
                                name='description'
                                className={styles.input}
                                autoComplete='question'
                                required
                                rows={10}
                            />
                        </div>

                        <div className={styles.form_item}>
                            <label
                                htmlFor='files'
                                className={styles.label}
                            >
                                {translated.tag_files}
                            </label>

                            <FileInput
                                name={'attachments'}
                                className={styles.input}
                                files={files}
                                setIsDisabled={setIsDisabled}
                                setFiles={setFiles}
                                key={'public-reception-input'}
                            />
                        </div>

                        <button
                            disabled={isDisabled}
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

export default withTranslate(PublicReceptionView, ['PublicReception']);
