export const CheckResponse = (status: number) => {
  if (status >= 200 && status < 300) {
    return { success: true, message: 'Request was successful', retry: false };
  } else if (status === 400) {
    return { success: false, message: 'Bad request - please check the input', retry: false };
  } else if (status === 401) {
    return { success: false, message: 'Unauthorized - please authenticate', retry: false };
  } else if (status === 404) {
    return { success: false, message: 'Resource not found', retry: false };
  } else if (status >= 500 && status < 600) {
    return { success: false, message: 'Server error - try again later', retry: true };
  } else {
    return { success: false, message: 'Unexpected status code', retry: false };
  }
};
