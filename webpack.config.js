const Dotenv = require('dotenv-webpack');

module.exports = {
  // Your other Webpack configuration options...
  plugins: [
    new Dotenv(), // This loads environment variables from the .env file
  ],
};