import { IQrCodeResponse, ITariff, ITariffResponse, IUserCardResponse } from '@my_types/card-types';
import { IResponse } from '@my_types/main-types';
import { API } from '@src/axios';
import { requestHandler } from '../request-handler';

class CardService {
    async getUserCard(cookie: string): Promise<IUserCardResponse> {
        return requestHandler(() =>
            API.get('/biz/card/user-card', { headers: { Cookie: cookie } })
        );
    }

    async getQrCode(cookie: string): Promise<IQrCodeResponse> {
        return requestHandler(() => API.get('/biz/card/qrcode', { headers: { Cookie: cookie } }));
    }

    async getAllTariffs(cookie: string): Promise<ITariffResponse> {
        return requestHandler(() =>
            API.get('/biz/tariff/client/all', { headers: { Cookie: cookie } })
        );
    }
    async getTariff(cookie: string, uuid: string): Promise<IResponse<ITariff>> {
        return requestHandler(() =>
            API.get(`/biz/tariff/client/${uuid}`, { headers: { Cookie: cookie } })
        );
    }
}

export default new CardService();
