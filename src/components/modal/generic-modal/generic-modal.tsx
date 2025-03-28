import WithAnimate from '@components/animation/with-animate';
import { ReactNode } from 'react';
import styles from './generic-modal.module.scss';

interface IGenericModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    modalKey: string;
    children: ReactNode;
}

const GenericModal = ({
    children,
    isOpen,
    modalKey,
    onClose,
    title,
    subtitle,
}: IGenericModalProps) => {
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

                {children}
            </WithAnimate>
        </WithAnimate>
    );
};

export default GenericModal;
