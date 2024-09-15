import { PasswordInput } from '@components/elements';
import { GenericModal } from '@components/modal';
import { IResetPasswordRequest } from '@my_types/auth-types';
import authService from '@service/auth/auth-service';
import { patterns } from '@src/utils/constants';
import { formDataFormatter, toastPusher, universalFetcher } from '@src/utils/helpers';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './update-password.module.scss';

interface IUpdatePasswordProps {
    translated: IntlMessages['Profile']['update_password'];
}

const UpdatePassword = ({ translated }: IUpdatePasswordProps) => {
    const [isPasswordUpdate, setIsPasswordUpdate] = useState(false);

    const updatePasswordFetcher = async (data: IResetPasswordRequest) => {
        return universalFetcher({
            requestFn: async () => await authService.resetPassword(data),
            successAction: () => setIsPasswordUpdate(false),
        });
    };

    const handleUpdatePassword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = formDataFormatter(event) as IResetPasswordRequest;

        if (data.new_password !== data.confirm_password) {
            toast.error(translated.messages.error_password);
            return;
        }

        toastPusher(updatePasswordFetcher(data), {
            success: translated.messages.success,
            loading: translated.messages.loading,
            error: {
                default: translated.messages.error_default,
            },
        });
    };

    return (
        <>
            <button
                className={styles.btn}
                onClick={() => setIsPasswordUpdate(true)}
            >
                {translated.btn_title}
            </button>

            <GenericModal
                isOpen={isPasswordUpdate}
                modalKey='update-password-modal'
                onClose={() => setIsPasswordUpdate(false)}
                title={translated.title}
            >
                <form
                    className={styles.form}
                    onSubmit={handleUpdatePassword}
                >
                    <input
                        type='text'
                        value='username'
                        autoComplete='username'
                        className={styles.hiddenInput}
                        readOnly
                        aria-hidden='true'
                        tabIndex={-1}
                    />
                    <input
                        type='password'
                        placeholder={translated.old_pass}
                        name='old_password'
                        autoComplete='current-password'
                        className={styles.input}
                        required
                    />
                    <PasswordInput
                        placeholder={translated.new_pass}
                        name='new_password'
                        className={styles.input}
                        required
                        autoComplete='new-password'
                        pattern={patterns.password}
                        title={translated.password_title}
                    />

                    <PasswordInput
                        type='password'
                        placeholder={translated.conf_new_pass}
                        name='confirm_password'
                        autoComplete='new-password'
                        className={styles.input}
                        required
                        pattern={patterns.password}
                        title={translated.password_title}
                    />

                    <div className={styles.footer}>
                        <button
                            type='reset'
                            onClick={() => setIsPasswordUpdate(false)}
                        >
                            {translated.cancel}
                        </button>
                        <button type='submit'>{translated.save_changes_btn}</button>
                    </div>
                </form>
            </GenericModal>
        </>
    );
};

export default UpdatePassword;
