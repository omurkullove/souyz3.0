'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import styles from './part-faq.module.scss';

import WithAnimate from '@components/animation/with-animate';
import { Link } from '@i18n/routing';
import {
    FaAddressCard,
    FaBriefcase,
    FaFile,
    FaHandHoldingDollar,
    FaMagnifyingGlass,
    FaRegistered,
} from 'react-icons/fa6';

const ICONS = [
    <FaAddressCard />,
    <FaBriefcase />,
    <FaFile />,
    <FaMagnifyingGlass />,
    <FaRegistered />,
    <FaHandHoldingDollar />,
];

const variants = {
    active: {
        translateX: 10,
    },
} as Variants;

interface IPartFAQProps {
    translated: IntlMessages['Home']['PartFAQ'];
}

const PartFAQ = ({ translated }: IPartFAQProps) => {
    const [activeFAQ, setActiveFAQ] = useState(translated.questions[0]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <WithAnimate
                    to='right'
                    type='slide'
                >
                    <h5 className={styles.title}>{translated.title}</h5>
                </WithAnimate>

                <WithAnimate
                    to='left'
                    type='slide'
                >
                    <Link
                        href={'/faq'}
                        className={styles.link}
                    >
                        Перейти в раздел FAQ
                    </Link>
                </WithAnimate>
            </div>

            <div className={styles.content}>
                <div className={styles.questions}>
                    {translated.questions.map((item, index) => (
                        <WithAnimate
                            key={item.id}
                            type='both'
                            to='up'
                            whileHover={'active'}
                        >
                            <div
                                onClick={() => setActiveFAQ(item)}
                                className={`${styles.question_item} ${
                                    activeFAQ.id === item.id && styles.active
                                }`}
                            >
                                <motion.div
                                    variants={variants}
                                    className={styles.icon}
                                >
                                    {ICONS[index]}
                                </motion.div>
                                <p className={styles.question_title}>{item.title}</p>
                            </div>
                        </WithAnimate>
                    ))}
                </div>
                <WithAnimate
                    type='fade'
                    duration={1}
                    className={styles.answer}
                >
                    <p className={styles.text}>{activeFAQ.answer}</p>
                </WithAnimate>
            </div>
        </div>
    );
};

export default PartFAQ;
