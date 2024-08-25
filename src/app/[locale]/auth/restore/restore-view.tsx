'use client';

import { Link, useRouter } from '@/navigation';
import WithAnimate from '@components/animation/with-animate';
import { PasswordInput } from '@components/elements';
import { withTranslate } from '@i18n/withTranslate';
import { IRestorePasswordRequest } from '@my_types/auth-types';
import authService from '@service/auth/auth-service';
import { patterns } from '@src/utils/constants';
import { formDataFormatter, toastPusher, universalFetcher } from '@src/utils/helpers';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import styles from './restore-view.module.scss';

interface IRestoreViewProps {
    translated: IntlMessages['Restore'];
}

const RestoreView = ({ translated }: IRestoreViewProps) => {
    const route = useRouter();

    const restorePasswordFetcher = async (data: IRestorePasswordRequest) => {
        return universalFetcher({
            requestFn: async () => await authService.restorePassword(data),
            successAction: () => route.push('/auth/login'),
        });
    };

    const handleRestorePassword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = formDataFormatter(event) as IRestorePasswordRequest;

        if (data.new_password !== data.confirm_password) {
            toast.error('Пароли не совпадают')!;
            return;
        }

        toastPusher(restorePasswordFetcher(data), {
            success: 'Сброс пароля выполнен успешно',
            error: {
                '400': 'Неверный код сброса',
                default: 'Ошибка при сбросе пароля',
            },
            loading: 'Сброс пароля...',
        });
    };

    return (
        <WithAnimate
            type='fade'
            className={styles.container}
        >
            <form
                className={styles.form}
                onSubmit={handleRestorePassword}
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
                    <input
                        type='text'
                        placeholder={translated.code}
                        name='code'
                        className={styles.input}
                        autoComplete='code'
                        required
                    />

                    <PasswordInput
                        placeholder={translated.new_pass}
                        name='new_password'
                        className={styles.input}
                        required
                        autoComplete='new-password'
                        title={translated.password_title}
                        pattern={patterns.password}
                    />
                    <PasswordInput
                        placeholder={translated.conf_new_pass}
                        name='confirm_password'
                        className={styles.input}
                        autoComplete='new-password'
                        required
                        title={translated.password_title}
                        pattern={patterns.password}
                    />
                </div>

                <button
                    className={styles.btn}
                    type='submit'
                >
                    {translated.btn}
                </button>

                <div className={styles.footer}>
                    <p className={styles.footer_title}>
                        {translated.has_account}
                        <Link
                            href='/auth/preregister'
                            className={styles.link}
                        >
                            {translated.link}
                        </Link>
                    </p>

                    <p className={styles.footer_title}>
                        {translated.no_code}
                        <Link
                            href='/auth/prerestore'
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

export default withTranslate(RestoreView, ['Restore']);
