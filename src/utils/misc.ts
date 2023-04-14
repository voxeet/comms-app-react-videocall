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

export function debounce<T extends unknown[]>(fn: (...args: T) => void, wait: number) {
  let timer: ReturnType<typeof setTimeout>;
  function debounceFunc(...args: T) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  }

  return debounceFunc;
}
