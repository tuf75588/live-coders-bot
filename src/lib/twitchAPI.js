// @ts-check
import axios from 'axios';
import config from '../config.js';

const twitchAPI = axios.create({
  baseURL: 'https://api.twitch.tv/kraken',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    Authorization: `OAuth ${config.OAUTH_TOKEN}`,
    'Client-ID': config.CLIENT_ID,
  },
});

export async function getChannel(channelId) {
  const { data } = await twitchAPI.get(`/channels/${channelId}`);
  return data;
}

export async function getTeam(teamName) {
  const {
    data: { users },
  } = await twitchAPI.get(`/teams/${teamName}`);
  return users;
}

export async function getStream(channelId) {
  const {
    data: { stream },
  } = await twitchAPI.get(`/streams/${channelId}`);
  return stream;
}
