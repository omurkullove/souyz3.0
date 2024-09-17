import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['ru', 'kg'];

export default getRequestConfig(async ({ locale }) => {
    const baseLocale = new Intl.Locale(locale).baseName;
    if (!locales.includes(baseLocale)) notFound();

    return {
        messages: (await import(`../../messages/${baseLocale}.json`)).default,
    };
});
