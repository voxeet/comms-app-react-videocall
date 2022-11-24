export const determineProvider = (rtmpURL: string) => {
  switch (true) {
    case /youtube/gi.test(rtmpURL):
      return 'youtube';
    case /facebook/gi.test(rtmpURL):
      return 'facebook';
    case /twitch/gi.test(rtmpURL):
      return 'twitch';
    default:
      return 'other';
  }
};
