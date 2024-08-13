import Image from 'next/image';
import styles from './promo-card.module.scss';
import WithAnimate from '@components/animation/with-animate';
import { Link } from '@/navigation';

interface IPromoCardProps {
    translated: IntlMessages['Home']['QuickConsultation'] | IntlMessages['Home']['Support'];
    wallpaper: string;
    link: string;
}

const PromoCard = ({ link, translated, wallpaper }: IPromoCardProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.img_wrapper}>
                <Image
                    className={styles.img}
                    src={wallpaper}
                    alt={wallpaper}
                    sizes='1000'
                    fill
                />
            </div>
            <div className={styles.content_wrapper}>
                <WithAnimate type='fade'>
                    <p className={styles.title}>{translated.title}</p>
                </WithAnimate>

                <WithAnimate type='fade'>
                    <Link
                        href={link}
                        className={styles.link}
                    >
                        {translated.link}
                    </Link>
                </WithAnimate>
            </div>
        </div>
    );
};

export default PromoCard;
