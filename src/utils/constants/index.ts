export const domain = 'localhost:3000';
export const protocol = 'http';

export const API_URL = `${protocol}://${domain}/skgapi/v1`;
export const FETCH_API_RL = `${protocol}://${domain}`;

export const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY;

export const patterns = {
    password: '(?=.*[A-ZА-ЯЁ])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-zА-Яа-яЁё\\d@$!%*?&]{8,}',
    only_cyrillic_text: '^[А-Яа-яЁёҢңҮүӨө]+(?: [А-Яа-яЁёҢңҮүӨө]+)*$',
};

export const NEWS_PAGE_COOKIE_EXPIRE = new Date(Date.now() + 10 * 60 * 1000);
