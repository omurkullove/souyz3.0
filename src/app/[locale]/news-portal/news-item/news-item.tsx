import { INews } from '@my_types/news-types';
import { useLocale } from '@providers/locale-provider';
import moment from 'moment';
import styles from './news-item.module.scss';

const NewsItem = ({ item, source_title }: { item: INews; source_title: string }) => {
    const { locale } = useLocale();

    const moment_locale = locale === 'ru' ? 'ru' : 'ky';

    moment.locale(moment_locale);

    const formattedDate = moment(item.created_time).format('DD.MM.YY, HH:mm');
    const relativeTime = moment(item.created_time).fromNow();

    return (
        <div className={styles.container}>
            <a
                href={item.link}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.title}
            >
                {item.title}
            </a>
            <div className={styles.meta}>
                <span className={styles.date}>
                    {formattedDate} - {relativeTime}
                </span>
                <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.source}
                >
                    {source_title}
                </a>
            </div>
        </div>
    );
};

export default NewsItem;
