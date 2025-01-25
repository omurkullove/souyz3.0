import { motion } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from './pop-up-chat.module.scss';

interface IProps {}

const PopUpChat: FC<IProps> = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const openChat = () => setIsOpen(true);
    const closeChat = () => setIsOpen(false);

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                closeChat();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <motion.div
            data-status={isOpen ? 'true' : ''}
            ref={containerRef}
            onClick={openChat}
            className={styles.container}
            initial={{ height: 40 }}
            animate={{ height: isOpen ? 400 : 40 }}
            transition={{ duration: 0.1, ease: isOpen ? 'backInOut' : 'backIn' }}
        >
            <div className={styles.header_box}>
                <p className={styles.title}>Есть вопросы? Напишите!</p>
                <motion.div
                    initial={{ transform: 'rotate(0deg)' }}
                    animate={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    transition={{ duration: 0.5 }}
                >
                    <FaArrowUp
                        className={styles.icon}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isOpen) {
                                closeChat();
                            } else {
                                openChat();
                            }
                        }}
                    />
                </motion.div>
            </div>

            {/* <Chat /> */}
        </motion.div>
    );
};

export default PopUpChat;
