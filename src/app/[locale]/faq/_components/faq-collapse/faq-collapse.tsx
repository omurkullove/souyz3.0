import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Collapse from '../collapse/collapse';
import styles from './faq-collapse.module.scss';

interface IFaqCollapseProps {
    translated: IntlMessages['FAQ']['questions'];
}

const FaqCollapse = ({ translated }: IFaqCollapseProps) => {
    const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    return (
        <div className={styles.container}>
            {translated?.map((faq, index) => (
                <div
                    key={index}
                    className={styles.collapse_item}
                >
                    <div
                        onClick={() => toggleFAQ(index)}
                        className={styles.header}
                    >
                        <p className={styles.question}>{faq.title}</p>

                        <div className={styles.arrow_icon_container}>
                            <LazyMotion
                                features={domAnimation}
                                strict
                            >
                                <m.div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        transformOrigin: 'center',
                                    }}
                                    animate={{
                                        rotate: activeFAQ === index ? 180 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <IoIosArrowDown
                                        className={styles.arrow_icon}
                                    />
                                </m.div>
                            </LazyMotion>
                        </div>
                    </div>
                    <Collapse open={activeFAQ === index}>
                        <div className={styles.answer_container}>
                            <p className={styles.answer}>{faq.answer}</p>
                        </div>
                    </Collapse>
                </div>
            ))}
        </div>
    );
};

export default FaqCollapse;
