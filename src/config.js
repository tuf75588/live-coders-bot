import env from './env.js';

const config = {
  ...env,
  // 30 minute cooldown on shoutouts should be enough
  SHOUTOUT_TIMEOUT: 30 * 60 * 1000,
  /**
   * The message to be sent when a live coder (or whatever team member) is detected
   *
   * @param {string} name the team name specified to Twitch
   * @param {string} status the  title of the current (or most recent) stream for that team member
   * @param {string} game the category the team member was last streaming in
   */
  getMessage(name, status, game) {
    return `Livecoders team memeber detected! 👋 Welcome ${name}! Checkout their channel here: https://twitch.tv/${name} They were last seen streaming ${status} in ${game}`;
  },
};

export default config;
