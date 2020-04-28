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

// client.connect();

const twitchAPI = axios.create({
  baseURL: 'https://api.twitch.tv/kraken',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    Authorization: `OAuth ${process.env.OAUTH_TOKEN}`,
    'Client-ID': process.env.CLIENT_ID,
  },
});

function initBot(teamMembers) {
  const members = teamMembers.reduce((idObj, member) => {
    // eslint-disable-next-line
    idObj.set(member._id, member);
    return idObj;
  }, new Map());
  client.connect();
  client.on('message', (channel, userState, message, self) => {
    if (self) return;
    if (userState['message-type'] === 'whisper') return;
    if (members.has(userState['user-id'])) {
      // someone has gone live
      client.say(
        channel,
        `Live coders team member detected! ${userState.username}`
      );
    }
  });
}

// eslint-disable-next-line import/prefer-default-export
export async function getTeam(teamName) {
  const {
    data: { users },
  } = await twitchAPI.get(`/teams/${teamName}`);

  return users;
}
