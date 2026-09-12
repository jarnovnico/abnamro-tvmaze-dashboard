/* instead of using Lodash this helper is all we need to handle the deboucing of api calls
1. call()
2. wait
3. another call?
- yes -> then reset the timer
- no -> excute
 */
export function debounce(
  callback: () => void,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    };

    timeoutId = setTimeout(
      callback,
      delay,
    );
  };
};