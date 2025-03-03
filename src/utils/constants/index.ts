export const domain = 'soyuz.kg';
export const protocol = 'https';
export const sharedCookieDomain = '.example.local';

export const API_URL = `${protocol}://${domain}/skgapi/v1`;
export const LOCAL_API_URL = `http://example.local:3000/api`;

export const WEATHER_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;

export const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY;

export const REFRESH_INTERVAL_GUARD = 20 * 1000;

export const patterns = {
    password: '(?=.*[A-ZА-ЯЁ])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-zА-Яа-яЁё\\d@$!%*?&]{8,}',
    only_cyrillic_text: '^[А-Яа-яЁёҢңҮүӨө]+(?: [А-Яа-яЁёҢңҮүӨө]+)*$',
};

export const NEWS_PAGE_COOKIE_EXPIRE = new Date(Date.now() + 10 * 60 * 1000);

export const socialMedias = {
    telegram: {
        path: 'https://t.me/SOYUZKG',
    },
    instagram: {
        path: 'https://www.instagram.com/soyuz.kg?igsh=Ymg0MHQ4Mjd6dDU0',
    },
    whatsApp: {
        path: 'https://wa.me/996551888850',
    },
    vk: {
        path: '',
    },
} as const;

export enum COOKIES {
    NEXT_LOCALE = 'NEXT_LOCALE',
    SESSION = 'session',
    THEME = 'theme',
}

export const locales = ['ru', 'kg'];
