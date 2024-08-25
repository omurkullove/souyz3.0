import cardService from '@service/card/card-service';
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import TariffPurchaseView from './tariff-purchase-view';

const fetchTariff = async (cookie: string, uuid: string) => {
    const tariff_data = await cardService.getTariff(cookie, uuid);

    return tariff_data;
};

const generateCacheKey = (cookie: string, uuid: string) => ['tariff-single-data', cookie, uuid];

const fetchCachedTariff = (cookie: string, uuid: string) => {
    const cacheKey = generateCacheKey(cookie, uuid);
    return unstable_cache(() => fetchTariff(cookie, uuid), cacheKey)();
};

interface ITariffPurchaseProps {
    params: {
        id: string;
    };
}

const TariffPurchase = async ({ params }: ITariffPurchaseProps) => {
    const { id } = params;

    const access_token = cookies().get('access_token')?.value;
    const refresh_token = cookies().get('refresh_token')?.value;

    const cookie = `access_token=${access_token}; refresh_token=${refresh_token}`;

    const { data } = await fetchCachedTariff(cookie, id[0]);

    return <TariffPurchaseView tariff={data} />;
};

export default TariffPurchase;
