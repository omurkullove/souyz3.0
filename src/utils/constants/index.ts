export const domain = 'soyuz.kg';

export const API_URL = `https://${domain}/skgapi/v1`;

export const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY;

export const patterns = {
    password: '(?=.*[A-ZА-ЯЁ])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-zА-Яа-яЁё\\d@$!%*?&]{8,}',
    only_cyrillic_text: '^[А-Яа-яЁёҢңҮүӨө]+(?: [А-Яа-яЁёҢңҮүӨө]+)*$',
};

export const NEWS_PAGE_COOKIE_EXPIRE = new Date(Date.now() + 10 * 60 * 1000);
