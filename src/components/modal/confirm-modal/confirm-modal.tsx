import WithAnimate from '@components/animation/with-animate';
import styles from './confirm-modal.module.scss';

interface IConfirmModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
    title: string;
    subtitle: string;
    confirm_btn_text: string;
    modalKey: string;
    cancel_btn_text: string;
}

const ConfirmModal = ({
    confirm_btn_text,
    cancel_btn_text,
    isOpen,
    onClose,
    onConfirm,
    subtitle,
    title,
    modalKey,
}: IConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <WithAnimate
            className={styles.container}
            key={modalKey}
            type='fade'
            onClick={onClose}
        >
            <WithAnimate
                className={styles.modal}
                type='both'
                to='up'
                stopPropagation
            >
                <p className={styles.title}>{title}</p>
                <p className={styles.subtitle}>{subtitle}</p>

                <div className={styles.footer}>
                    <button onClick={onConfirm}>{confirm_btn_text}</button>
                    <button onClick={onClose}>{cancel_btn_text}</button>
                </div>
            </WithAnimate>
        </WithAnimate>
    );
};

export default ConfirmModal;
