export const environment = {
  production: false,
  API_URL: process.env['API_URL'] || 'http://localhost:3000',
  stripe: {
    publicKey: process.env['STRIPE_PUBLIC_KEY'],
  }
};
