import dotenv from 'dotenv';

dotenv.config();

const {
  OAUTH_TOKEN,
  CLIENT_ID,
  CHANNEL_NAME,
  BOT_USERNAME,
  CHANNEL_ID,
  TEAM_NAME,
} = process.env;

const env = {
  OAUTH_TOKEN,
  CLIENT_ID,
  CHANNEL_NAME,
  CHANNEL_ID,
  BOT_USERNAME,
  TEAM_NAME,
};

// check to ensure all envrionmental variables are accounted for

Object.entries(env).forEach(([name, value]) => {
  if (!value) {
    throw new Error(`${name} is not specified in your .env file`);
  }
});
export default env;
