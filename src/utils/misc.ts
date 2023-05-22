export function debounce<T extends unknown[]>(fn: (...args: T) => void, wait: number) {
  let timer: ReturnType<typeof setTimeout>;
  function debounceFunc(...args: T) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  }

  return debounceFunc;
}
