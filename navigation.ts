import { locales } from '@src/i18n/i18n';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
    locales: locales,
    localePrefix: 'never',
});
