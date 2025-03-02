'use client';

import { ReactNode } from 'react';
import styles from './layout.module.scss';

import { Toaster } from 'react-hot-toast';
import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';

interface ILayoutProps {
    children: ReactNode;
    theme: Theme;
}

const Layout = ({ children, theme }: ILayoutProps) => {
    return (
        <div className={styles.container}>
            <Toaster position='bottom-right' />

            <aside className={styles.aside}>
                <Sidebar theme={theme} />
            </aside>
            <div className={styles.children}>
                <header className={styles.header}>
                    <Header theme={theme} />
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
