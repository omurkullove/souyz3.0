'use client';

import { withTranslate } from '@i18n/withTranslate';
import HeaderDesktop from './header-desktop/header-desktop';
import HeaderMobile from './header-mobile/header-mobile';
import styles from './header.module.scss';

type TranslateType = IntlMessages['Header'];

const Header = ({ translated, mode }: { translated: TranslateType; mode: ModeType }) => {
    return (
        <>
            <div className={styles.header_desktop}>
                <HeaderDesktop translated={translated} />
            </div>

            <div className={styles.header_mobile}>
                <HeaderMobile mode={mode} />
            </div>
        </>
    );
};

export default withTranslate(Header, ['Header']);
