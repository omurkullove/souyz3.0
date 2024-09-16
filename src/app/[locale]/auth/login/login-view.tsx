'use client';

import { Link } from '@/navigation';
import WithAnimate from '@components/animation/with-animate';
import { PasswordInput } from '@components/elements';
import { withTranslate } from '@i18n/withTranslate';
import { ILoginRequest, ISession } from '@my_types/auth-types';
import { useLocale } from '@providers/locale-provider';
import { useUser } from '@providers/user-provider';
import { FETCH_API_RL } from '@src/utils/constants';
import {
    formDataFormatter,
    pushAndRefresh,
    toastPusher,
    universalFetcher,
} from '@src/utils/helpers';
import { FormEvent } from 'react';
import styles from './login-view.module.scss';

interface ILoginViewProps {
    translated: IntlMessages['Login'];
}

const LoginView = ({ translated }: ILoginViewProps) => {
    const { updateUser } = useUser();
    const { locale } = useLocale();

    const onSuccess = ({ user }: { user: ISession }) => {
        updateUser(user);
        localStorage.removeItem('timer');
        localStorage.removeItem('prerestore-timer');
        localStorage.removeItem('preregister-timer');
        pushAndRefresh(`/${locale}/profile`);
    };

    const loginFetcher = async (loginData: ILoginRequest) => {
        return universalFetcher({
            url: `${FETCH_API_RL}/api/login`,
            body: loginData,
            method: 'POST',
            successAction: onSuccess,
            delay: true,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginData = formDataFormatter(event) as ILoginRequest;

        toastPusher(loginFetcher(loginData), {
            loading: translated.messages.loading,
            success: translated.messages.success,
            error: {
                '401': translated.messages.error_401,
                '404': translated.messages.error_404,
                default: translated.messages.error_default,
            },
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
                <div className={styles.input_block}>
                    <input
                        type='email'
                        placeholder={translated.email}
                        name='email'
                        className={styles.input}
                        autoComplete='email'
                        required
                    />

                    <PasswordInput
                        placeholder={translated.password}
                        name='password'
                        className={styles.input}
                        autoComplete='current-password'
                        required
                    />

                    <Link
                        className={styles.forgot_password}
                        href={'/auth/prerestore'}
                    >
                        {translated.forgot_password}
                    </Link>
                </div>

                <button
                    className={styles.btn}
                    type='submit'
                >
                    {translated.btn}
                </button>

                <p className={styles.footer_title}>
                    {translated.no_account}{' '}
                    <Link
                        href='/auth/preregister'
                        className={styles.link}
                    >
                        {translated.link}
                    </Link>
                </p>
            </form>
        </WithAnimate>
    );
};

export default withTranslate(LoginView, ['Login']);
