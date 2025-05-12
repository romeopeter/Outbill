/*
import { useEffect, useRef } from "react";
import Button from "./components/util-components/button";
import {
  CaretRight,
  FileDashed,
  Files,
  Moon,
  PaperPlaneTilt,
  Sun,
} from "@phosphor-icons/react";
import { useLocalStorage } from "./hooks/use-local-storage";
import { useLocation, useNavigate } from "react-router-dom";
import getBrowserApi from "./utils/browser-extn-api";

export default function Popup() {
  const [storedValue, setStoredValue] = useLocalStorage("theme", "light");
  const location = useLocation();
  const navigate = useNavigate();
  const isInitiallyRouted = useRef(false);

  useEffect(() => {
    if (storedValue === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add(storedValue);
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add(storedValue);
    }
  }, [storedValue]);

  useEffect(() => {
    console.log("Effect is running! Location search:", location.search); // <-- Log 1

    // Run once as component mounts
    if (isInitiallyRouted.current) {
      console.log("Effect already processed, returning."); // <-- Log 2

      return;
    }

    if (!location.search && window.location.search) {
      console.warn("[New Tab] location.search is empty, but window.location.search has params. Waiting for React Router to sync.", "window.location.search:", window.location.search);
      // By not setting initialRouteProcessed.current to true here,
      // the effect will re-run when `location` (hopefully with search params) changes.
      return;
  }

    const queryParams = new URLSearchParams(location.search);
    const initialRoute = queryParams.get("initialRoute");

    console.log("Query Params:", queryParams.toString());
    console.log("Extracted initialRoute:", initialRoute);


    if (initialRoute) {
      console.log("found initial route in query param:", initialRoute); // <-- Log 3
      console.log("Attempting to navigate to:", initialRoute); // <-- Log 5

      // route to the specified route
      navigate(initialRoute, { replace: true });
    } else {
      console.log("No initialRoute parameter found."); // <-- Log 4
    }

    isInitiallyRouted.current = true;
  }, [location, navigate]);

  const toggleThemeChange = (theme: string) => setStoredValue(theme);

  // Open panel in new tab
  const openRouteInNewTab = async (routePath: string) => {
    const browser = await getBrowserApi();

    if (browser) {
      try {
        const baseUrl = browser.runtime.getURL("index.html");
        const urlWithRoute = `${baseUrl}?initialRoute=${encodeURIComponent(
          routePath
        )}`;

        browser.tabs.create({ url: urlWithRoute });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-[var(--brand-blue-light)] dark:bg-[var(--brand-black)] flex flex-col justify-between gap-y-32 text-white p-4">
      <header className="flex items-center justify-between">
        <div id="logo">
          {storedValue === "dark" ? (
            <img src="/logo-white.svg" className="w-[6rem] h-auto" alt="" />
          ) : (
            <img src="/logo-dark.svg" className="w-[6rem] h-auto" alt="" />
          )}
        </div>

        <div className="size-8 rounded-full bg-[#22365cad] flex items-center justify-center cursor-pointer">
          {storedValue === "light" ? (
            <Moon
              weight="bold"
              className="text-xl"
              onClick={() => toggleThemeChange("dark")}
            />
          ) : (
            <Sun
              weight="bold"
              className="text-xl"
              onClick={() => toggleThemeChange("light")}
            />
          )}
        </div>
      </header>

      <div id="invoice-summary">
        <div className="bg-white shadow-slate-100 dark:bg-[var(--brand-blue)] dark:shadow-none rounded-md p-2 divide-y-[0.8px] divide-[var(--brand-black)] dark:divide-white space-y-3">
          <div className="flex items-center justify-between font-light pb-1 cursor-pointer">
            <div className="flex items-center">
              <div className="size-7 rounded-full flex items-center justify-center bg-blue-400 mr-1">
                <Files className="text-[1.125rem]" />
              </div>
              <span className="text-[var(--brand-black)] dark:text-white text-md capitalize">
                All
              </span>
            </div>

            <div className="flex items-center text-[var(--brand-black)] dark:text-white">
              <span className="mr-1 text-md">13</span>
              <CaretRight />
            </div>
          </div>

          <div className="flex items-center justify-between font-light pb-1 cursor-pointer">
            <div className="flex items-center">
              <div className="size-7 rounded-full flex items-center justify-center bg-yellow-500 mr-1">
                <FileDashed className="text-[1.125rem]" />
              </div>
              <span className="text-[var(--brand-black)] dark:text-white text-md capitalize">
                Draft
              </span>
            </div>

            <div className="flex items-center text-[var(--brand-black)] dark:text-white">
              <span className="mr-1 text-md">5</span>
              <CaretRight />
            </div>
          </div>

          <div className="flex items-center justify-between font-light pb-1 cursor-pointer">
            <div className="flex items-center">
              <div className="size-7 rounded-full flex items-center justify-center bg-green-500 mr-1">
                <PaperPlaneTilt className="text-[1.125rem]" />
              </div>

              <span className="text-[var(--brand-black)] dark:text-white text-md capitalize">
                Sent
              </span>
            </div>

            <div className="flex items-center text-[var(--brand-black)] dark:text-white text-md capitalize">
              <span className="text-md mr-1">8</span>
              <CaretRight />
            </div>
          </div>
        </div>

        <p className="text-center text-[#4b5e8159] text-[1.125rem] pt-4 font-normal">
          Invoicing made easy
        </p>
      </div>

      <div id="quick-actions" className="flex justify-center gap-4">
        <Button
          text="Create invoice"
          variant="solid"
          className="w-[16rem] h-[2.756rem] font-light rounded-xl flex items-center justify-center"
          onClick={() => openRouteInNewTab("/overview")}
        />
      </div>

      <div className="text-[#4b5e81f0] text-sm font-light">
        <div className="flex justify-center gap-3 mb-1">
          <a
            href="https://useoutbill.com/faq"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Help
          </a>
          <a
            href="https://useoutbill.com/about"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            About
          </a>
          <a
            href="https://useoutbill.com"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            OutBill
          </a>
        </div>

        <hr />

        <p className="text-center">
          <span>&copy;{new Date().getFullYear()}</span> | All Rights Reserved.
        </p>
      </div>
    </div>
  );
} */

const documentRoot = document.documentElement;
const themeSwitcher = document.querySelector("#theme-switcher-icons") as HTMLImageElement;
const invoiceBtn = document.querySelector("#create-invoice-btn");
const logo = document.querySelector("#logo") as HTMLImageElement;
const dateContainer =  document.getElementById("#date-container") as HTMLSpanElement;

function applyTheme(currentTheme: string = "light") {
  window.localStorage.setItem("outbill-theme", currentTheme);

  // Remove existing theme and add current theme.
  documentRoot.classList.remove("dark", "light");
  documentRoot.classList.add(currentTheme);

  // Create theme switcher/toggler icons
  const moonIcon = document.createElement('i');
  const sunIcon = document.createElement('i');

  if (logo) {
    if (currentTheme === "dark") {
      logo.src = "/icons/logo-white.svg";
    } else {
      logo.src = "/icons/logo-dark.svg";
    }
  }

  if (themeSwitcher) {
    if (currentTheme === "dark") {
      themeSwitcher.src = "/icons/sun-fill.svg";
    } else {
      themeSwitcher.src = "/icons/moon-fill.svg";
    }
  }

  if (themeSwitcher) {
    if (currentTheme === "dark") {
      sunIcon.classList.add("ph-bold","ph-sun")
      // themeSwitcher.removeChild
      themeSwitcher.appendChild(sunIcon)
    } else {
      moonIcon.classList.add("ph-bold","ph-moon")
      // themeSwitcher.removeChild(moonIcon)
      themeSwitcher.appendChild(moonIcon)
    }
  }
}

// Load and apply the initial theme
let currentTheme = window.localStorage.getItem("outbill-theme");
applyTheme(currentTheme || "light");

themeSwitcher.addEventListener("click", () => {
  let newTheme = documentRoot.classList.contains("dark") ? "light" : "dark";

  console.log(
    `Change theme from ${
      documentRoot.classList.contains("dark") ? "dark" : "light"
    } to ${newTheme}`
  );

  // Apply the new theme and update localStorage
  applyTheme(newTheme);
  window.localStorage.setItem("outbill-theme", newTheme);
});

/* Create tabs and render app panels (Managed by ReactJS) */
invoiceBtn?.addEventListener("click", () => {
  //@ts-ignore
  if (window.chrome && window.chrome.runtime) {
    //@ts-ignore
    const panelUrl = window.chrome.runtime.getURL("/panels/panels.html");
    //@ts-ignore
    window.chrome.tabs.create({ url: panelUrl });
  } else {
    console.log("Extension API not available");
  }
});

// Footer date
const year = new Date().getFullYear()
dateContainer.innerHTML = `&copy; ${year}`;
