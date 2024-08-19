'use client';

import { Link } from '@/navigation';
import styles from './login-view.module.scss';
import { FormEvent } from 'react';
import WithAnimate from '@components/animation/with-animate';
import { ILoginRequest, ISession } from '@my_types/auth-types';
import { formDataFormatter, pushAndRefresh, toastPusher, universalFetcher } from '@src/utils';
import { useUser } from '@providers/user-provider';
import { useLocale } from '@providers/locale-provider';
import { withTranslate } from '@i18n/withTranslate';
import { PasswordInput } from '@components/elements';

interface ILoginViewProps {
    translated: IntlMessages['Login'];
}

const LoginView = ({ translated }: ILoginViewProps) => {
    const { updateUser } = useUser();
    const { locale } = useLocale();

    const onSuccess = ({ user }: { user: ISession }) => {
        localStorage.removeItem('timer');
        updateUser(user);
        pushAndRefresh(`/${locale}/profile`);
    };

    const loginFetcher = async (loginData: ILoginRequest) => {
        return universalFetcher({
            url: '/api/login',
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
            loading: 'Выполняется вход...',
            success: 'Вход выполнен успешно!',
            error: {
                '401': 'Неправильная почта или пароль',
                '404': 'Пользователь не найден',
                default: 'Ошибка входа, попробуйте позже',
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
                        href={'/'}
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
