// const base = `^(?! )(?!.*\\s$)(?!.* {2})[a-zA-Za-åa-ö-w-я 0-9/@%!#?_.]`;
export const isValid = (value: string, minLength: number) => {
  /*
    For more specific validation - consider using commented code
   */
  // const regex = new RegExp(`${base}{${minLength},30}$`);
  // return regex.test(value);
  return value.length >= minLength && value.length <= 30;
};
