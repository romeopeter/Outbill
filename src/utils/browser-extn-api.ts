import isExtensionContext from "./context-check";
import { Browser } from "webextension-polyfill";
/* ---------------------------------------------------------------------- */

let browserAPI: null | Browser = null; // Holds extension API when loaded.
let importPromise: null | Promise<Browser | null> = null; // Holds ongoing import promise

/**
 *
 * @returns {Promise<Browser|null>}
 */
export default function getBrowserApi() {
  // Return extension API immediately if loaded
  if (browserAPI) {
    return Promise.resolve(browserAPI);
  }

  // CRITICAL CHECK: Only proceed if we are in an extension context
  if (!isExtensionContext()) {
    console.log("[getBrowserApi] Not in extension context. Returning null.");
    return Promise.resolve(null);
  }

  // If import is already in progress, return the existing promise
  if (importPromise) {
    return importPromise;
  }

  console.log("Dynamically importing polyfill...");
  importPromise = import("webextension-polyfill")
    .then((polyfill) => {
      console.log("[getBrowserApi] Polyfill imported successfully.");

      browserAPI = polyfill.default || polyfill;
      importPromise = null; // Clear the promise cache

      return browserAPI;
    })
    .catch((error) => {
      console.error(
        "[getBrowserApi] Failed to dynamically import webextension-polyfill:",
        error
      );

      importPromise = null; // Clear the promise cache

      return null; // Return null if import fails
    });

  return importPromise;
}
