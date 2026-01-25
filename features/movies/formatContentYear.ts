type FormatContentYearParams = {
  year?: string;
  startYear?: string;
  endYear?: string;
  numberOfSeasons?: number;
};

export function formatContentYear({
  year,
  startYear,
  endYear,
  numberOfSeasons,
}: FormatContentYearParams): string | null {
  const isTvShow = startYear !== undefined || numberOfSeasons !== undefined;

  if (isTvShow) {
    let yearRange = '';

    if (startYear && endYear) {
      yearRange = `${startYear}-${endYear}`;
    } else if (startYear) {
      yearRange = `${startYear}-`;
    } else if (endYear) {
      yearRange = `-${endYear}`;
    }

    const seasonsText =
      numberOfSeasons !== undefined
        ? ` (${numberOfSeasons} ${numberOfSeasons === 1 ? 'season' : 'seasons'})`
        : '';

    if (yearRange) return `${yearRange}${seasonsText}`;
    if (seasonsText) return seasonsText.trim();

    return null;
  }

  return year ?? null;
}
