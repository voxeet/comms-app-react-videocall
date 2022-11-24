export const processErrorStatus = (err: any) => {
  let status;
  let message;
  if (typeof err === 'string') {
    const parseStatus = (message: string) => {
      return Number(message.split('code ')[1].split(' ')[0]) || 500;
    };
    status = parseStatus(err);
    message = err;
  } else {
    const { response } = err;

    status = (response?.status || response.statusText) ?? 500;
    message = response.message || response.error || '';
  }
  return { status, message };
};
