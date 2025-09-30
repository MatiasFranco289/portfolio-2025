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
