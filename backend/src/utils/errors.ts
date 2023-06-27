const narrowObj = (thing: unknown) => {
  return typeof thing === 'object' && thing !== null ? thing : null;
};

export const processErrorStatus = (err: unknown): { status: number; message: string } => {
  let status = 500;
  let message = '';
  if (typeof err === 'string') {
    const parseStatus = (message: string) => {
      return Number(message.split('code ')[1].split(' ')[0]) || 500;
    };
    status = parseStatus(err);
    message = err;
  } else {
    const checkedErr = narrowObj(err);

    if (checkedErr && 'response' in checkedErr) {
      const checkedResponse = narrowObj(checkedErr.response);

      if (checkedResponse) {
        if ('status' in checkedResponse && typeof checkedResponse.status === 'number') {
          status = checkedResponse.status;
        } else if ('statusText' in checkedResponse && typeof checkedResponse.statusText === 'number') {
          status = checkedResponse.statusText;
        } else {
          status = 500;
        }

        if ('message' in checkedResponse && typeof checkedResponse.message === 'string') {
          message = checkedResponse.message;
        } else if ('error' in checkedResponse && typeof checkedResponse.error === 'string') {
          message = checkedResponse.error;
        } else {
          message = '500';
        }
      }
    }
  }
  return { status, message };
};
