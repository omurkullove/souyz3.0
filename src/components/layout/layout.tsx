import { ReactNode } from 'react';
import styles from './layout.module.scss';

import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Toaster } from 'react-hot-toast';

interface ILayoutProps {
    children: ReactNode;
    mode: ModeType;
}

const Layout = ({ children, mode }: ILayoutProps) => {
    return (
        <div className={styles.container}>
            <Toaster position='bottom-right' />
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
