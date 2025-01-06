export const domain = 'localhost:3000';
export const protocol = 'http';

export const API_URL = `${protocol}://${domain}/skgapi/v1`;
export const FETCH_API_RL = `${protocol}://${domain}`;

export const WEATHER_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;

export const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY;

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
