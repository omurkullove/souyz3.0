import WithAnimate from '@components/animation/with-animate';

import debounce from 'lodash.debounce';
import { ChangeEvent, FC, ReactNode, useCallback, useState } from 'react';
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
    translated: IntlMessages['FAQ']['chat'];
    questions: IQuestion[];
}

interface IProps {
    translated: IntlMessages['FAQ']['chat'];
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

    return (
        <div className={styles.container}>
            <div
                className={styles.chat}
                role='log'
                aria-live='polite'
            >
                <WithAnimate
                    className={styles.message}
                    type='fade'
                >
                    {translated.initial_bot_message}
                </WithAnimate>
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
        </div>
    );
};

export default Chat;
