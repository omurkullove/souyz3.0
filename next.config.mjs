/** @type {import('next').NextConfig} */

import withNextIntl from 'next-intl/plugin';

const nextIntlConfig = withNextIntl('./src/i18n/i18n.ts');

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: `${process.env.DESTINATION}*`,
            },
        ];
    },
};

export default nextIntlConfig(nextConfig);
