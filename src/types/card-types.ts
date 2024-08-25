import { IPaginatedResponse, IResponse } from './main-types';

type CardType = 'compatriot' | 'foreigner';

type CardStatusType = 0 | 1 | 2;

interface ITariffTranslate {
    name: string;
    description: string[];
}

export interface ITariff {
    translates: {
        [key in Locale]: ITariffTranslate;
    };
    card_type: CardType;
    status: CardStatusType;
    price: number;
    uuid: string;
}

export interface ICardData {
    type: CardType;
    uuid: string;
    expire_date: string;
    tariff: ITariff;
    status: CardStatusType;
}

export interface IUserCardResponse extends IResponse {
    data: ICardData;
}

export interface IQrCodeResponse extends IResponse {
    data: string;
}

export interface ITariffResponse extends IPaginatedResponse<ITariff> {}
