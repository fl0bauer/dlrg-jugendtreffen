const nextTranslatePlugin = require("next-translate-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = nextTranslatePlugin(nextConfig);
