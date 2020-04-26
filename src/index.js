// @ts-check

// eslint-disable-next-line import/extensions
import * as twitchAPI from './lib/twitchAPI.js';

twitchAPI
  .getTeam('livecoders')
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
