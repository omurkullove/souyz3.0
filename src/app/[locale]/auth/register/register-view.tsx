'use client';

import WithAnimate from '@components/animation/with-animate';
import { PasswordInput } from '@components/elements';
import { Link, useRouter } from '@i18n/routing';
import { withTranslate } from '@i18n/withTranslate';
import { IRegisterData, IRegisterRequest } from '@my_types/auth-types';
import { patterns } from '@src/utils/constants';
import {
    formattedPhoneNumber,
    formDataFormatter,
    toastPusher,
    universalFetcher,
} from '@src/utils/helpers';
import { FormEvent } from 'react';
import { registerAction } from '../actions';
import styles from './register-view.module.scss';

interface IRegisterViewProps {
    translated: IntlMessages['Register'];
}

const RegisterView = ({ translated }: IRegisterViewProps) => {
    const router = useRouter();

    const registerFetcher = async (data: IRegisterRequest) => {
        return universalFetcher({
            requestFn: async () => await registerAction(data),
            delay: true,
            successAction: () => router.push('/auth/login'),
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = formDataFormatter(event) as IRegisterData & { code: string };

        const { code, ...userData } = data;

        const register_request_data = {
            params: {
                code,
            },
            user: userData,
        } as IRegisterRequest;

        toastPusher(registerFetcher(register_request_data), {
            success: translated.messages.success,
            error: {
                '409': translated.messages.error[409],
                '400': translated.messages.error[400],
                default: translated.messages.error.default,
            },
            loading: translated.messages.loading,
        });
    };

    return (
        <WithAnimate
            type='fade'
            className={styles.container}
        >
            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <div className={styles.header}>
                    <p className={styles.title}>{translated.title}</p>
                    <p className={styles.subtitle}>{translated.subtitle}</p>
                </div>
                <div className={styles.input_container}>
                    <input
                        type='text'
                        placeholder={translated.first_name}
                        name='first_name'
                        className={styles.input}
                        autoComplete='name'
                        required
                        pattern={patterns.only_cyrillic_text}
                        title={translated.cyrillic_only}
                    />
                    <input
                        type='email'
                        placeholder={translated.email}
                        name='email'
                        className={styles.input}
                        autoComplete='email'
                        required
                    />
                    <input
                        type='text'
                        placeholder={translated.last_name}
                        name='last_name'
                        className={styles.input}
                        autoComplete='family-name'
                        required
                        pattern={patterns.only_cyrillic_text}
                        title={translated.cyrillic_only}
                    />

                    <PasswordInput
                        placeholder={translated.password}
                        name='password'
                        className={styles.input}
                        minLength={8}
                        autoComplete='current-password'
                        required
                        pattern={patterns.password}
                        title={translated.password_title}
                    />

                    <input
                        type='tel'
                        placeholder={translated.phone}
                        name='phone'
                        minLength={7}
                        defaultValue={'+'}
                        className={styles.input}
                        autoComplete='tel'
                        required
                        onInput={formattedPhoneNumber}
                    />
                    <input
                        type='text'
                        placeholder={translated.code}
                        name='code'
                        className={styles.input}
                        autoComplete=''
                        required
                    />
                </div>

                <button
                    className={styles.btn}
                    type='submit'
                    disabled={false}
                >
                    {translated.btn}
                </button>

                <div className={styles.footer}>
                    <p className={styles.footer_title}>
                        {translated.has_account}
                        <Link
                            href='/auth/login'
                            className={styles.link}
                        >
                            {translated.has_account_link}
                        </Link>
                    </p>

                    <p className={styles.footer_title}>
                        {translated.no_code}
                        <Link
                            href='/auth/preregister'
                            className={styles.link}
                        >
                            {translated.no_code_link}
                        </Link>
                    </p>
                </div>
            </form>
        </WithAnimate>
    );
};

export default withTranslate(RegisterView, ['Register']);
