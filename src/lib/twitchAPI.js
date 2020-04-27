// @ts-check
import axios from 'axios';
import tmi from 'tmi.js';
import dotenv from 'dotenv';

dotenv.config();
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },

  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: ['atd285'],
});

client.connect();

client.on('message', (channel, userstate, message, self) => {
  if (self) {
    return;
  }
  switch (userstate['message-type']) {
    case 'whisper':
      return;
    case 'chat':
      if (message.toLowerCase() === '!hello') {
        client.say(channel, `${userstate.username} hey!`);
      } else if (message.toLowerCase() === '!hi') {
        client.say(channel, 'hi!');
      }
      break;
    default:
      // eslint-disable-next-line consistent-return
      return userstate;
  }
});

const twitchAPI = axios.create({
  baseURL: 'https://api.twitch.tv/kraken',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    Authorization: `OAuth ${process.env.OAUTH_TOKEN}`,
    'Client-ID': process.env.CLIENT_ID,
  },
});

function getChannel(channelName) {
  return channelName;
}

// eslint-disable-next-line import/prefer-default-export
export async function getTeam(teamName) {
  const {
    data: { users },
  } = await twitchAPI.get(`/teams/${teamName}`);
  return users;
}
