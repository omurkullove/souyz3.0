/** @type {import('next').NextConfig} */

import withNextIntl from 'next-intl/plugin';

const nextIntlConfig = withNextIntl('./src/i18n/i18n.ts');

const nextConfig = {};

export default nextIntlConfig(nextConfig);
