'use client';

import { Link, usePathname } from '@/navigation';
import { withTranslate } from '@i18n/withTranslate';
import { useUser } from '@providers/user-provider';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import styles from './sidebar-mobile.module.scss';

interface IProps {
    toggleSidebar: () => void;
    translated: IntlMessages['Sidebar'];
}

const SidebarMobile = ({ toggleSidebar, translated }: IProps) => {
    const path = usePathname();
    const { user } = useUser();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.logo}>Soyuz.KG</p>

                <IoClose
                    className={styles.close}
                    onClick={toggleSidebar}
                />
            </div>

            <div className={styles.line} />
            <p className={styles.subtitle}>{translated.title}</p>
            <div className={styles.line} />

            <div className={styles.link_container}>
                {translated.links.map((item, index) => {
                    const isActive = item.path === path || (path.includes('/auth') && index == 0);
                    const isLast = index === translated.links.length - 1;

                    return (
                        <Link
                            className={`${styles.link}  ${isActive && styles.active}`}
                            href={item.path}
                            onClick={toggleSidebar}
                            target={item.target}
                            key={item.label}
                        >
                            {index === 0 && user
                                ? `${user.first_name} ${user.last_name}`
                                : item.label}

                            {isLast && <div className={styles.beta_line}>Beta</div>}
                        </Link>
                    );
                })}
            </div>
            <div className={styles.line} />

            <div className={styles.footer}>
                <Image
                    src={'/images/footer/soyuz-logo.png'}
                    alt='soyuz-logo.png'
                    width={100}
                    height={50}
                />

                <p className={styles.text}>{translated.footer_text}</p>
            </div>
        </div>
    );
};

export default withTranslate(SidebarMobile, ['Sidebar']);
