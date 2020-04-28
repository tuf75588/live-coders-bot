// @ts-check

// eslint-disable-next-line import/extensions
import tmi from 'tmi.js';
import * as twitchAPI from './lib/twitchAPI.js';
import config from './config.js';

// initialize our tmi client

const client = new tmi.Client({
  options: {
    debug: true,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: config.BOT_USERNAME,
    password: config.OAUTH_TOKEN,
  },
  channels: [config.CHANNEL_NAME],
});

function initBot(teamMembers) {
  const membersById = teamMembers.reduce((id, member) => {
    // eslint-disable-next-line
    id.set(member._id, member);
    return id;
  }, new Map());
  const shoutOutById = new Map();
  client.connect();
  client.on('message', async (channel, userState, message, self) => {
    const {
      'message-type': messageType,
      'user-id': userId,
      'display-name': displayName,
      username,
    } = userState;
    // The streamer might not have a dislay_name set
    const name = displayName ?? username;
    // do not reply to our own messages
    if (self) return;
    // don't respond to whispers
    if (messageType === 'whisper') return;
    if (message === '!livecoders') {
      client.say(
        channel,
        `Checkout the live coders community website here! https://livecoders.dev`
      );
    }

    /*
    two part check to ensure we don't shoutout the client does not shout themselves out every chat
    ensure the user id exists in the live coders data returned from Twitch
    */
    if (userId !== config.CHANNEL_ID && membersById.has(userId)) {
      // once a team member gets a shoutout, populate the shoutOutsbyId Map with their ID.
      if (
        !shoutOutById.has(userId) ||
        shoutOutById.get(userId) + Number(config.SHOUTOUT_TIMEOUT) < Date.now()
      ) {
        shoutOutById.set(userId, Date.now());
        const { game, status } = await twitchAPI.getChannel(userId);
        client.say(channel, config.getMessage(name, status, game));
      }
    }
  });
}

// ship it!
twitchAPI.getTeam(config.TEAM_NAME).then(initBot);
