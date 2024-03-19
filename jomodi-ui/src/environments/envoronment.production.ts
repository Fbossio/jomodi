export const environment = {
  production: true,
  API_URL: process.env['API_URL'] || 'jomodi-api-dev.us-east-1.elasticbeanstalk.com',
  stripe: {
    publicKey: process.env['STRIPE_PUBLIC_KEY'],
  }
};
