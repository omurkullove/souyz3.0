'use client';

import { Link, useRouter } from '@/navigation';
import WithAnimate from '@components/animation/with-animate';
import { withTranslate } from '@i18n/withTranslate';
import authService from '@service/auth/auth-service';
import { formDataFormatter, toastPusher, universalFetcher } from '@src/utils/helpers';
import { FormEvent, useEffect, useState } from 'react';
import styles from './prerestore-view.module.scss';

interface IPrerestoreViewProps {
    translated: IntlMessages['Prerestore'];
}

const PrerestoreView = ({ translated }: IPrerestoreViewProps) => {
    const [timer, setTimer] = useState<number>(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const router = useRouter();

    const onSuccess = () => {
        refreshTimer();

        setTimeout(() => {
            router.push('/auth/restore');
        }, 1000);
    };

    const refreshTimer = () => {
        setTimer(60);
        setIsButtonDisabled(true);
        localStorage.setItem('prerestore-timer', JSON.stringify(60));
    };

    const prerestoreFetcher = async (data: { email: string }) => {
        return universalFetcher({
            requestFn: async () => await authService.prerestore(data),
            successAction: onSuccess,
            onErrorFn: refreshTimer,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = formDataFormatter(event) as { email: string };

        toastPusher(prerestoreFetcher(data), {
            error: {
                default: 'Ошибка отправки кода, повторите позже',
            },
            loading: `Отправляем код на почту: ${data.email}`,
            success: `Код успешно отправлен на почту: ${data.email}`,
        });
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const storedTimer = localStorage.getItem('prerestore-timer');
        if (storedTimer) {
            setTimer(JSON.parse(storedTimer));
        }
    }, []);

    useEffect(() => {
        let countdown: NodeJS.Timeout | null = null;

        if (timer > 0) {
            setIsButtonDisabled(true);
            countdown = setInterval(() => {
                setTimer((prevTimer) => {
                    const newTimer = prevTimer - 1;
                    if (newTimer <= 0) {
                        localStorage.setItem('prerestore-timer', JSON.stringify(0));
                        setIsButtonDisabled(false);
                        return 0;
                    }
                    localStorage.setItem('prerestore-timer', JSON.stringify(newTimer));
                    return newTimer;
                });
            }, 1000);
        } else {
            setIsButtonDisabled(false);
        }

        return () => {
            if (countdown) {
                clearInterval(countdown);
            }
        };
    }, [timer]);

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
                <input
                    type='email'
                    placeholder={translated.email}
                    name='email'
                    className={styles.input}
                    autoComplete='email'
                    required
                />

                <button
                    className={styles.btn}
                    type='submit'
                    disabled={isButtonDisabled}
                >
                    {translated.btn}
                </button>

                {isButtonDisabled && (
                    <div className={styles.timer_block}>
                        <p className={styles.title}>{translated.send_code_again}</p>
                        <p className={styles.timer}>{formatTime(timer)}</p>
                    </div>
                )}

                <div className={styles.footer}>
                    <p className={styles.footer_title}>
                        {translated.has_account}
                        <Link
                            href='/auth/login'
                            className={styles.link}
                        >
                            {translated.link}
                        </Link>
                    </p>

                    <Link
                        href='/auth/restore'
                        className={styles.has_link}
                    >
                        {translated.has_code}
                    </Link>
                </div>
            </form>
        </WithAnimate>
    );
};

export default withTranslate(PrerestoreView, ['Prerestore']);
