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
import browser from "webextension-polyfill";
import { useLocalStorage } from "./hooks/use-local-storage";
import { useLocation, useNavigate } from "react-router-dom";

/* ------------------------------------------------------------------------------- */

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

      return
    };

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
  }, [location.search, navigate]);

  const toggleThemeChange = (theme: string) => setStoredValue(theme);

  // Open panel in new tab
  const openRouteInNewTab = (routePath: string) => {
    if (typeof browser !== undefined) {
      const baseUrl = browser.runtime.getURL("index.html");
      const urlWithRoute = `${baseUrl}?initialRoute=${encodeURIComponent(
        routePath
      )}`;

      console.log(urlWithRoute);

      browser.tabs.create({ url: urlWithRoute });
    }
  };

  return (
    <div className="bg-[var(--brand-blue-light)] dark:bg-[var(--brand-black)] flex flex-col justify-between gap-y-32 text-white p-4">
      <header className="flex items-center justify-between">
        <h1 className="text-[var(--brand-black)] dark:text-white text-xl font-sacramento">
          OutBill.
        </h1>

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

        <p className="text-center text-[#4b5e8159] text-[1.125rem] pt-4 font-source-code font-normal">
          Invoicing made easy
        </p>
      </div>

      <div id="quick-actions" className="flex justify-center gap-4">
        <Button
          text="Send an invoice"
          variant="outline"
          className="w-auto h-[2.756rem] font-light rounded-xl flex items-center justify-center border-[0.8px]"
          onClick={() => openRouteInNewTab("/overview")}
        />

        <Button
          text="Create invoice"
          variant="solid"
          className="w-auto h-[2.756rem] font-light rounded-xl flex items-center justify-center"
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
}
