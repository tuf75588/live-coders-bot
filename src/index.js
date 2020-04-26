// @ts-check

import * as twitchAPI from './twitchAPI.js';

twitchAPI
  .getTeam('livecoders')
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
