export function debounce<T extends unknown[]>(fn: (...args: T) => void, wait: number) {
  let timer: ReturnType<typeof setTimeout>;
  function debounceFunc(...args: T) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  }

  return debounceFunc;
}

export function splitMeetingAlias(str: string): [string] | [string, string] {
  const regex = /(.+)\|(.+)/;
  const match = str.match(regex);
  if (match) {
    const [, name, timestamp] = match;
    return [name, timestamp];
  }
  return [str];
}

export function getMeetTimestamp(str: string): number | undefined {
  const [, timestamp = ''] = splitMeetingAlias(str);

  const parsed = parseInt(timestamp, 10);

  return Number.isNaN(parsed) ? undefined : parsed;
}

export function openInNewTab(url: string) {
  window.open(url, '_blank')?.focus();
}
