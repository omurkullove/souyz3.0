'use client';

import WithAnimate from '@components/animation/with-animate';
import { FileInput } from '@components/elements';
import HeroPages from '@components/hero-pages/hero-pages';
import { withTranslate } from '@i18n/withTranslate';
import { ILaborCenterRequest } from '@my_types/counseling-types';
import { patterns } from '@src/utils/constants';
import {
    formattedPhoneNumber,
    formDataFormatter,
    toastPusher,
    universalFetcher,
} from '@src/utils/helpers';
import { FormEvent, useState } from 'react';
import { legalCenterAction } from '../legal-center/action';
import styles from './labor-center-view.module.scss';

interface ILaborCenterViewProps {
    translated: IntlMessages['LaborCenter'];
}

const LaborCenterView = ({ translated }: ILaborCenterViewProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const submitFetcher = async (data: FormData) => {
        return universalFetcher({
            requestFn: async () => await legalCenterAction(data),
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = formDataFormatter(event) as ILaborCenterRequest;

        const formData = new FormData();

        formData.append('type', 'labor_center');

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'attachments') {
                console.log(key, value);
                formData.append(key, value as string | Blob);
            }
        });

        files.forEach((file) => {
            formData.append('attachments', file);
        });

        toastPusher(submitFetcher(formData), {
            success: translated.messages.success,
            error: {
                '422': translated.messages.error_422,
                default: translated.messages.error_default,
            },
            loading: translated.messages.loading,
        });
    };

    return (
        <div className={styles.container}>
            <HeroPages
                img_key='labor-center'
                title={translated.hero_title}
            />

            <WithAnimate
                type='both'
                to='up'
                triggerInView={false}
            >
                <div className={styles.content}>
                    <div className={styles.header}>
                        <p className={styles.text}>{translated.text}</p>

                        <ul className={styles.keys_list}>
                            {translated.keys.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

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

export default withTranslate(LaborCenterView, ['LaborCenter']);
