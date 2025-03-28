type RuMessages = typeof import('./messages/ru.json');
type KgMessages = typeof import('./messages/kg.json');

declare interface IntlMessages extends RuMessages, KgMessages {}

declare type IntlNamespaces = keyof RuMessages | keyof KgMessages;

type CapitalizedKeys<T> = {
    [K in keyof T]: K extends string
        ? K extends Capitalize<K>
            ? `${K}` | `${K}:${CapitalizedKeys<T[K]>}`
            : never
        : never;
}[keyof T];

declare type IntlNamespaces =
    | CapitalizedKeys<RuMessages>
    | CapitalizedKeys<KgMessages>;

declare type Locale = 'ru' | 'kg';
declare type Theme = 'light' | 'dark';
