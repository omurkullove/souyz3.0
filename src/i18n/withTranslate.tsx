import ru from '@/messages/ru.json';
import kg from '@/messages/kg.json';

import { useLocale } from '@providers/locale-provider';
import { ComponentType, FC, useMemo } from 'react';

const locales = {
    ru,
    kg,
};

export function withTranslate<P, N extends IntlNamespaces>(
    WrappedComponent: ComponentType<P & { translated: IntlMessages[IntlNamespaces] }>,
    namespaces: N[]
) {
    const WithTranslate: FC<Omit<P, 'translated'>> = (props) => {
        const { locale } = useLocale();

        const translated = useMemo(() => {
            return namespaces.reduce((acc, namespace) => {
                const namespaceTranslations = locales[locale]?.[namespace] || {};
                return { ...acc, ...namespaceTranslations };
            }, {} as IntlMessages[IntlNamespaces]);
        }, [locale, namespaces]);

        return (
            <WrappedComponent
                {...(props as P)}
                translated={translated}
            />
        );
    };

    return WithTranslate;
}
