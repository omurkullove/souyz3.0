import { ReactNode } from 'react';
import styles from './layout.module.scss';

import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { Sidebar } from '@components/sidebar';

interface ILayoutProps {
    children: ReactNode;
    mode: ModeType;
}

const Layout = ({ children, mode }: ILayoutProps) => {
    return (
        <div className={styles.container}>
            <aside className={styles.aside}>
                <Sidebar mode={mode} />
            </aside>
            <div className={styles.children}>
                <header className={styles.header}>
                    <Header />
                </header>
                <main>{children}</main>
                <footer className={styles.footer}>
                    <Footer />
                </footer>
            </div>
        </div>
    );
};

export default Layout;
