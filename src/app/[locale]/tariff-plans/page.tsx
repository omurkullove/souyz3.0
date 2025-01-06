import cardService from '@service/card/card-service';
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import TariffPlansView from './tariff-plans-view';

const fetchAllTariffs = async (cookie: string) => {
    const tariff_data = await cardService.getAllTariffs(cookie);

    return tariff_data;
};

const fetchCachedAllTariffs = (cookie: string) => {
    return unstable_cache(() => fetchAllTariffs(cookie), ['tariff-data'], {
        revalidate: 60 * 60 * 24,
    })();
};

const TariffPlans = async () => {
    const access_token = cookies().get('access_token')?.value;
    const refresh_token = cookies().get('refresh_token')?.value;

    const cookie = `access_token=${access_token}; refresh_token=${refresh_token}`;

    const { data } = await fetchCachedAllTariffs(cookie);

    return <TariffPlansView tariffs={[]} />;
};

export default TariffPlans;
