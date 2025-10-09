import axiosInstance from "./axios";
import { API_KEY, LOGIN_URL } from "./constants";

export async function copyToClipboard(
  text: string,
  onSuccess?: () => void,
  onError?: () => void
) {
  try {
    await navigator.clipboard.writeText(text);
    onSuccess && onSuccess();
  } catch (err) {
    console.error(
      `The following error has occurred while trying to copy a text to the clipboard: `
    );
    console.error(JSON.stringify(err));
    onError && onError();
  }
}

export async function login() {
  return axiosInstance
    .post(LOGIN_URL, {
      username: process.env.NEXT_PUBLIC_API_USERNAME,
      password: process.env.NEXT_PUBLIC_API_PASSWORD,
    })
    .then((res) => {
      const apiResponse = res.data.data[0];
      const jwt = apiResponse.token;
      localStorage.setItem(API_KEY, jwt);
    })
    .catch((err) => {
      console.error(
        `The following error has occurred while trying to connect to the API: `
      );
      console.error(err);
    });
}
