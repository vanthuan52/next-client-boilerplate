import React, { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import withSuspense from "./with-suspense";
import { isSameURLWithoutSearch } from "../utils/is-same-url";

interface AppProgressBarProps {
  color?: string;
  height?: number;
  showSpinner?: boolean;
}

const AppProgressBar = ({
  color = "#0A2FFF",
  height = 2,
  showSpinner = true,
}: AppProgressBarProps) => {
  const anchorElements = useRef<HTMLAnchorElement[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  NProgress.configure({ showSpinner });

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const startProgress = () => {
      NProgress.start();
    };

    const stopProgress = () => {
      NProgress.done();
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const anchorElement = event.currentTarget as HTMLLinkElement;

      // Skip preventDefault
      if (event.defaultPrevented) return;

      // Skip anchors with target="_blank"
      const anchorTarget = anchorElement.target;
      if (anchorTarget === "_blank") return;

      // Skip control/command/option/alt+click
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const anchorURL = new URL(anchorElement.href, location.href);
      const currentURL = new URL(location.href);

      if (isSameURLWithoutSearch(anchorURL, currentURL)) return;

      startProgress();
    };

    const handleMutation: MutationCallback = () => {
      const elements = Array.from(document.querySelectorAll("a"));

      const validAnchorElements = elements.filter((anchor) => {
        const href = anchor.href;
        const isValid =
          href &&
          !href.startsWith("tel:") &&
          !href.startsWith("mailto:") &&
          !href.startsWith("blob:") &&
          !href.startsWith("javascript:");

        return isValid;
      });

      validAnchorElements.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick)
      );
      anchorElements.current = validAnchorElements;
    };

    const mutation = new MutationObserver(handleMutation);
    mutation.observe(document, { childList: true, subtree: true });

    const originalWindowHistoryPushState = window.history.pushState;
    window.history.pushState = new Proxy(window.history.pushState, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apply: (target, thisArg, argArray: any) => {
        stopProgress();
        return target.apply(thisArg, argArray);
      },
    });

    return () => {
      mutation.disconnect();
      anchorElements.current.forEach((anchor) =>
        anchor.removeEventListener("click", handleAnchorClick)
      );
      anchorElements.current = [];
      window.history.pushState = originalWindowHistoryPushState;
    };
  }, []);

  return (
    <style>{`
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: ${color};
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: ${height}px;
      }

      /* Fancy blur effect */
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        opacity: 1;

        -webkit-transform: rotate(3deg) translate(0px, -4px);
            -ms-transform: rotate(3deg) translate(0px, -4px);
                transform: rotate(3deg) translate(0px, -4px);
      }

      /* Remove these to get rid of the spinner */
      #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
      }

      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;

        border: solid 2px transparent;
        border-top-color: ${color};
        border-left-color: ${color};
        border-radius: 50%;

        -webkit-animation: nprogress-spinner 400ms linear infinite;
                animation: nprogress-spinner 400ms linear infinite;
      }

      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }

      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }

      @-webkit-keyframes nprogress-spinner {
        0%   { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }
      @keyframes nprogress-spinner {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  );
};

AppProgressBar.displayName = "AppProgressBar";

export default withSuspense(AppProgressBar);
