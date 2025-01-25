import { FileInput } from '@components/elements';
import { formDataFormatter } from '@src/utils/helpers';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, FormEvent, useState } from 'react';
import styles from './sos.module.scss';

interface IProps {
    translated: IntlMessages['PublicReception']['sos'];
}

const Sos: FC<IProps> = ({ translated }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [isFileUploadDisabled, setIsFileUploadDisabled] = useState(false);

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = formDataFormatter(event);
        console.log(formData);
        closeModal();
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsFileUploadDisabled(false);
        setFiles([]);
    };

    const overlayAnimation = {
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                duration: 0.3,
                delayChildren: 0.4,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: 'afterChildren',
                duration: 0.3,
                delay: 0.4,
            },
        },
    };

    return (
        <>
            <button
                className={styles.sos_btn}
                onClick={openModal}
            >
                {translated.btn_label}
            </button>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        variants={overlayAnimation}
                        className={styles.overlay}
                        onClick={closeModal}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className={styles.modal}
                            initial={{ y: '100vh' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100vh' }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.modalHeader}>
                                <h5 className={styles.modalTitle}>{translated.title}</h5>
                            </div>
                            <div className={styles.modalContent}>
                                <p>{translated.text}</p>
                                <form
                                    className={styles.form}
                                    onSubmit={handleFormSubmit}
                                >
                                    <div className={styles.form_item}>
                                        <label
                                            htmlFor='description'
                                            className={styles.label}
                                        >
                                            {translated.input_label}
                                        </label>
                                        <textarea
                                            name='description'
                                            className={styles.input}
                                            autoComplete='question'
                                            required
                                            rows={10}
                                            placeholder={translated.placeholder}
                                        />
                                    </div>

                                    <div className={styles.form_item}>
                                        <label
                                            htmlFor='attachments'
                                            className={styles.label}
                                        >
                                            {translated.file_label}
                                        </label>

                                        <FileInput
                                            name='attachments'
                                            className={styles.input}
                                            files={files}
                                            setIsDisabled={setIsFileUploadDisabled}
                                            setFiles={setFiles}
                                            key='sos-file-input'
                                        />
                                    </div>

                                    <div className={styles.modalFooter}>
                                        <button
                                            type='button'
                                            className={styles.modalButton}
                                            onClick={closeModal}
                                        >
                                            {translated.close}
                                        </button>

                                        <button
                                            type='submit'
                                            className={styles.modalButton}
                                            disabled={isFileUploadDisabled}
                                        >
                                            {translated.submit}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sos;
