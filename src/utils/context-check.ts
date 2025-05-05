/**
 * Checks if the code is running in a browser extension context.
 * Relies on the presence of `runtime.id` which is unique to extensions.
 * @returns {boolean}
 */
export default function isExtensionContext() {
  const hasRuntime = !!(
    (
       // @ts-ignore
      (window?.chrome && window?.chrome.runtime.id) ||
      //@ts-ignore
      (typeof window.browser !== "undefined" && window.browser.runtime.id)
    )
  );

  return hasRuntime;
}