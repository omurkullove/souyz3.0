'use client';

import WithAnimate from '@components/animation/with-animate';
import { ReactNode, useState } from 'react';
import styles from './faq-chat.module.scss';

interface IMessage {
    text: string;
    id: number;
    sender: 'bot' | 'user';
    component?: ReactNode;
}

interface IFaqChat {
    translated: IntlMessages['FAQ']['chat'];
}

const FaqChat = ({ translated }: IFaqChat) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [userMessage, setUserMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = () => {
        if (userMessage.trim()) {
            setMessages([
                ...messages,
                { text: userMessage, id: messages.length + 1, sender: 'user' },
            ]);
            setUserMessage('');
            setIsLoading(true);

            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        text: 'Пошел нахуй',
                        id: prevMessages.length + 1,
                        sender: 'bot',
                    },
                ]);
                setIsLoading(false);
            }, 2000);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.chat}>
                <WithAnimate
                    className={styles.message}
                    type='fade'
                >
                    {translated.initial_bot_message}
                </WithAnimate>
                {messages?.map((message) => (
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
                <input
                    type='text'
                    placeholder={translated.placeholder}
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>{translated.submit_btn}</button>
            </div>
        </div>
    );
};

export default FaqChat;
