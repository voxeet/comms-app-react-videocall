const basicTextRegex = /^(?! )(?!.*\s$)(?!.* {2})[a-zA-Za-åa-ö-w-я 0-9/@%!#?_.]{3,30}$/;

export const isValid = (value: string) => {
  return basicTextRegex.test(value);
};
