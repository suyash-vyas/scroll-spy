const DEFAULT_THRESHOLD_FOR_FIRST_HEADING = 0.5;

export const isFirstHeadingVisible = ({
  firstHeading,
  threshold = DEFAULT_THRESHOLD_FOR_FIRST_HEADING,
}: {
  firstHeading: HTMLHeadingElement;
  threshold?: number;
}): boolean => {
  const rect = firstHeading.getBoundingClientRect();

  if (rect.top >= 0 && rect.bottom <= window.innerHeight * threshold) {
    return true;
  }

  return false;
};

export const getInitialActiveHeadingId = ({
  firstHeading,
  threshold = DEFAULT_THRESHOLD_FOR_FIRST_HEADING,
}: {
  firstHeading: HTMLHeadingElement;
  threshold?: number;
}): string | undefined => {
  if (isFirstHeadingVisible({ firstHeading, threshold })) {
    return firstHeading.id;
  }

  return undefined;
};
