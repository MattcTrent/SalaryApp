export const containsAnyOf = (
  targetString: string,
  searchStrings: string[]
) => {
  return searchStrings.some((searchString) =>
    targetString.toLowerCase().includes(searchString.toLowerCase())
  );
};
