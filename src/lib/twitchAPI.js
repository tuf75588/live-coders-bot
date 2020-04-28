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
  const shoutoutById = new Map();
  client.connect();
  client.on('message', async (channel, userState, message, self) => {
    const {
      'message-type': messageType,
      'user-id': userId,
      username,
    } = userState;
    if (self) return;
    if (messageType === 'whisper') return;
    if (members.has(userState[userId])) {
      // someone has gone live
      if (shoutoutById.has(userId) || shoutoutById.get(userId)) {
        // do it
        shoutoutById.set(userId, Date.now());
        const channelInfo = await getChannel(userId);
        const { status, game, display_name: displayName } = channelInfo;
        const name = displayName ?? name;
        client.say(
          channel,
          `Livecoders imGlitch team member detected, welcome ${name}! They were last seen doing ${status} in ${game}`
        );
      }
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

async function getChannel(channelId) {
  // TODO
  const { data } = await twitchAPI.get(`/channels/${channelId}`);
  return data;
}

async function getStream(channelId) {
  const { data } = await twitchAPI.get(`/streams/${channelId}`);
  return data;
}
