// @ts-check
import axios from 'axios';

const twitchAPI = axios.create({
  baseURL: 'https://api.twitch.tv/kraken',
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
