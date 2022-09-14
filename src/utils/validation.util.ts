const base = `^(?! )(?!.*\\s$)(?!.* {2})[a-zA-Za-åa-ö-w-я 0-9/@%!#?_.]`;
export const isValid = (value: string, minLength: number) => {
  const regex = new RegExp(`${base}{${minLength},30}$`);
  return regex.test(value);
};
