import WithAnimate from '@components/animation/with-animate';
import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import { ChangeEvent, FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import styles from './chat.module.scss';

interface IMessage {
    text: string;
    id: number;
    sender: 'bot' | 'user';
    component?: ReactNode;
}

interface IQuestion {
    title: string;
    answer: string;
}

interface IFaqChat {
    translated: IntlMessages['PopUpChat'];
    questions: IQuestion[];
}

interface IProps {
    translated: IntlMessages['PopUpChat'];
    questions: IQuestion[];
}

const Chat: FC<IProps> = ({ questions, translated }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [userMessage, setUserMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredQuestions, setFilteredQuestions] = useState<IQuestion[]>([]);

    const debouncedSearch = useCallback(
        debounce((text: string) => {
            const searchText = text.trim().toLowerCase();
            if (searchText) {
                const matches = questions.filter((q) => q.title.toLowerCase().includes(searchText));
                setFilteredQuestions(matches);
            } else {
                setFilteredQuestions([]);
            }
        }, 300),
        [questions]
    );

    const handleSendMessage = useCallback(
        (title?: string) => {
            if (!userMessage.trim()) return;

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: title ?? userMessage, id: prevMessages.length + 1, sender: 'user' },
            ]);
            setUserMessage('');
            setIsLoading(true);
            setFilteredQuestions([]);

            const messageToSend = title ? title.trim() : userMessage.trim();
            const foundQuestion = questions.find(
                (q) => q.title.toLowerCase() === messageToSend.toLowerCase()
            );

            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        text: foundQuestion ? foundQuestion.answer : translated.no_answer,
                        id: prevMessages.length + 1,
                        sender: 'bot',
                    },
                ]);
                setIsLoading(false);
            }, 2000);
        },
        [userMessage, questions, translated]
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setUserMessage(value);
        debouncedSearch(value);
    };

    const handleClearChat = () => {
        setMessages([]);
        setUserMessage('');
        setFilteredQuestions([]);
    };

    const handleVariantClick = (title: string) => {
        setUserMessage('');
        handleSendMessage(title);
    };

    const chatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages.length, isLoading]);

    return (
        <div className={styles.container}>
            <div
                className={styles.list}
                ref={chatRef}
            >
                <div className={styles.message}>{translated.initial_bot_message}</div>

                {messages.map((message) => (
                    <WithAnimate
                        key={message.id}
                        className={message.sender === 'bot' ? styles.message : styles.my_message}
                        type='fade'
                    >
                        {message.text}
                    </WithAnimate>
                ))}

                {isLoading && (
                    <WithAnimate
                        type='fade'
                        className={styles.loading}
                    >
                        <div className={styles.circle} />
                        <div className={styles.circle} />
                        <div className={styles.circle} />
                    </WithAnimate>
                )}
            </div>

            <div className={styles.footer}>
                <div className={styles.variants}>
                    <AnimatePresence>
                        {filteredQuestions.map((question) => (
                            <motion.p
                                onClick={() => handleVariantClick(question.title)}
                                key={question.title}
                                initial={{ opacity: 0, translateY: 10 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                exit={{ opacity: 0, translateY: 10 }}
                                className={styles.variant}
                            >
                                {question.title}
                            </motion.p>
                        ))}
                    </AnimatePresence>
                </div>

                <input
                    disabled={isLoading}
                    type='text'
                    placeholder={translated.placeholder}
                    value={userMessage}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading}
                >
                    {translated.submit_btn}
                </button>
            </div>
        </div>
    );
};

export default Chat;
