// libs
import { useEffect, useState, useCallback } from "react";

// helpers
import { getInitialActiveHeadingId, isFirstHeadingVisible } from "./helpers";

export type UseScrollSpyProps = {
  headings: HTMLHeadingElement[];
  offset: number;
};

export const useScrollSpy = ({
  headings,
  offset,
}: UseScrollSpyProps): string | undefined => {
  const firstHeading = headings[0];
  const lastHeading = headings.at(-1);

  const [activeHeadingId, setActiveHeadingId] = useState<string | undefined>(
    () => {
      if (!firstHeading) {
        return undefined;
      }

      return getInitialActiveHeadingId({ firstHeading });
    },
  );

  const onScrollEnd = useCallback<() => void>(() => {
    if (!firstHeading || !lastHeading) {
      return;
    }

    const element = document.scrollingElement;

    if (!element) {
      return;
    }

    const top = element.scrollTop;

    if (top <= 0 && firstHeading) {
      if (isFirstHeadingVisible({ firstHeading })) {
        setActiveHeadingId(firstHeading.id);
      } else {
        setActiveHeadingId(undefined);
      }
    } else if (
      top + element.clientHeight >= element.scrollHeight - 6 &&
      lastHeading
    ) {
      /* 
        6px buffer because sometimes the scrollHeight is not exactly the same as the clientHeight due to rounding errors.
        See: https://stackoverflow.com/questions/3898130/check-if-a-user-has-scrolled-to-the-bottom-not-just-the-window-but-any-element
      */
      setActiveHeadingId(lastHeading.id);
    }
  }, [firstHeading, lastHeading]);

  useEffect(() => {
    if (!headings.length) return;

    /*
      Observer is not invoked in the order in which the headings are in DOM.
      We make observed area's height equal to the height of the smallest observed heading.
      This makes our scroll spy more precise by making sure only one heading can ever intersect.
    */
    const intersectionHeight = Math.min(...headings.map((h) => h.offsetHeight));

    const rootMargin = `-${offset}px 0px -${
      window.innerHeight - (offset + intersectionHeight)
    }px 0px`;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((entry) => {
          /* 
            Each non-empty heading will have data-navigation-unique-id defined as 
            we add this before making our navigation config.
          */
          const id = (entry.target as HTMLHeadingElement).id;

          if (entry.isIntersecting) {
            setActiveHeadingId(id);
          }
        });
      },
      {
        rootMargin,
        threshold: 0,
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    /* 
      When we scroll too fast, browser sometimes does not schedule an intersection change callback.
      We handle for this case for top and bottom of page using this scroll listener.
      For elements in between, we do not have any solution as of now.

      Ref: https://stackoverflow.com/questions/61951380/intersection-observer-fails-sometimes-when-i-scroll-fast 
    */
    window.addEventListener("scrollend", onScrollEnd);

    return () => {
      window.removeEventListener("scrollend", onScrollEnd);
      observer.disconnect();
    };
  }, [headings, offset, onScrollEnd]);

  return activeHeadingId;
};
