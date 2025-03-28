import { Link } from '@i18n/routing';
import { FaExternalLinkAlt } from 'react-icons/fa';
import styles from './sources.module.scss';

const Sources = ({
    sources,
}: {
    sources: IntlMessages['NewsPortal']['sources'];
}) => {
    return (
        <div className={styles.sources}>
            <p className={styles.title}>{sources.title}</p>
            <div className={styles.list}>
                <SourceLink
                    href='https://kgz.minpromtorg.gov.ru/'
                    text={sources.list_item1}
                />
                <SourceLink
                    href='https://kyrgyz.mid.ru/ru/'
                    text={sources.list_item2}
                />
                <SourceLink
                    href='http://www.korsovet.kg/'
                    text={sources.list_item3}
                />
                <SourceLink
                    href='https://economist.kg/'
                    text={sources.list_item4}
                />
            </div>
        </div>
    );
};

const SourceLink = ({ href, text }: { href: string; text: string }) => (
    <Link
        target='_blank'
        className={styles.source}
        href={href}
    >
        <span>{text}</span>
        <FaExternalLinkAlt className={styles.icon} />
    </Link>
);

export default Sources;
