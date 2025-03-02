import { IQrCodeResponse, ITariff, ITariffResponse, IUserCardResponse } from '@my_types/card-types';
import { IResponse } from '@my_types/main-types';
import { API } from '@src/axios';
import { requestHandler } from '../request-handler';

class CardService {
    async getUserCard(): Promise<IUserCardResponse> {
        return requestHandler(() => API.get('/biz/card/user-card'));
    }

    async getQrCode(): Promise<IQrCodeResponse> {
        return requestHandler(() => API.get('/biz/card/qrcode'));
    }

    async getAllTariffs(): Promise<ITariffResponse> {
        return requestHandler(() => API.get('/biz/tariff/client/all'));
    }
    async getTariff(uuid: string): Promise<IResponse<ITariff>> {
        return requestHandler(() => API.get(`/biz/tariff/client/${uuid}`));
    }
}

export default new CardService();
