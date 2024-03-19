export const environment = {
  production: false,
  API_URL: process.env['API_URL'] || 'http://jomodi-api-dev.us-east-1.elasticbeanstalk.com',
  stripe: {
    publicKey: process.env['STRIPE_PUBLIC_KEY'] || 'pk_test_51OOzzzB3EI7aqBiTI9ovUQqT9kznjBVfpEHWQoOe2b71XNMl18Pe7xdjSxAWRSCEItF8yLCNu6H8avaIHNJge7zv00HD29lO23',
  }
};
