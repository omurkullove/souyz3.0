import withNextIntl from 'next-intl/plugin';

const nextIntlConfig = withNextIntl('./src/i18n/request.ts');

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'sclub.example.local',
                    },
                ],
                destination: 'http://localhost:3001/:path*',
            },
        ];
    },
};

export default nextIntlConfig(nextConfig);
