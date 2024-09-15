'use client';

import HeroPages from '@components/hero-pages/hero-pages';
import { withTranslate } from '@i18n/withTranslate';
import { FaqChat, FaqCollapse } from './_components';
import styles from './faq-view.module.scss';

interface IFaqViewProps {
    translated: IntlMessages['FAQ'];
}

const FaqView = ({ translated }: IFaqViewProps) => {
    return (
        <div className={styles.container}>
            <HeroPages
                img_key='faq'
                title={translated.title}
            />

            <div className={styles.content}>
                <h5 className={styles.section_title}>{translated.title_questions}</h5>
                <FaqCollapse translated={translated.questions} />

                <h5 className={styles.section_title}>{translated.title_chat}</h5>
                <FaqChat
                    translated={translated.chat}
                    questions={translated.questions}
                />
            </div>
        </div>
    );
};

export default withTranslate(FaqView, ['FAQ']);
