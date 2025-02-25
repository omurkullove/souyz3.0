import withNextIntl from 'next-intl/plugin';

const nextIntlConfig = withNextIntl('./src/i18n/i18n.ts');

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/skgapi/v1/:path*',
                destination: `${process.env.NEXT_PUBLIC_DESTINATION}/skgapi/v1/:path*`,
            },
        ];
    },
};

export default nextIntlConfig(nextConfig);
