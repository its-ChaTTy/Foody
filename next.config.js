/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'www.riadjnaneimlil.com',
      'example.com',
      'static1.squarespace.com',
      'images.squarespace-cdn.com',
      'grantourismotravels.com',
      'www.the-pasta-project.com',
      'www.foodandwine.com',
      'media-cdn.tripadvisor.com',
      'assets.epicurious.com',
      'fitmencook.com',
      'thetalentzone.co.uk',
      'cookingmaniac.com',
      'images.getrecipekit.com',
      'www.thespruceeats.com',
      'i.pinimg.com',
      'www.flavoursholidays.co.uk',
      'mediaproxy.salon.com',
      'www.elle-et-vire.com',
      'blog.theteakitchen.com'
    ],
  },
  webpack(config) {
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes("_app")) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });
    return config;
  },
  sassOptions: {
    additionalData: `@import "styles/root/_mixins.scss";`,
  },
};

module.exports = nextConfig;