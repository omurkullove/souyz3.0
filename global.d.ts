type RuMessages = typeof import('./messages/ru.json');
type KgMessages = typeof import('./messages/kg.json');

declare interface IntlMessages extends RuMessages, KgMessages {}

declare type IntlNamespaces = keyof RuMessages | keyof KgMessages;

declare type IntlTranslateObj = {
    [K in IntlNamespaces]: {
        [P in keyof RuMessages[K] & KgMessages[K]]: string;
    };
};

declare type Locale = 'ru' | 'kg';
declare type ModeType = 'light' | 'dark';
