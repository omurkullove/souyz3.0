import cardService from '@service/card/card-service';
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import TariffPlansView from './tariff-plans-view';

const fetchAllTariffs = async (cookie: string) => {
    const tariff_data = await cardService.getAllTariffs(cookie);

    return tariff_data;
};

const generateCacheKey = (cookie: string) => ['tariff-data', cookie];

const fetchCachedAllTariffs = (cookie: string) => {
    const cacheKey = generateCacheKey(cookie);

    return unstable_cache(() => fetchAllTariffs(cookie), cacheKey)();
};

const TariffPlans = async () => {
    const access_token = cookies().get('access_token')?.value;
    const refresh_token = cookies().get('refresh_token')?.value;

    const cookie = `access_token=${access_token}; refresh_token=${refresh_token}`;

    const { data } = await fetchCachedAllTariffs(cookie);

    return <TariffPlansView tariffs={data?.items} />;
};

export default TariffPlans;
