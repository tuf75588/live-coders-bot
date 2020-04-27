// @ts-check
import axios from 'axios';
import dotenv from 'dotenv';
import tmi from 'tmi.js';

const client = new tmi.Client({
  connection: {
    secure: true,
  },
  identity: {
    username: 'Echo',
  },
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
