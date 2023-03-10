export const capitalize = (payload: string) => {
  payload = payload?.toLowerCase();

  const patternOfFirstLetter = /(\b[a-z])/g;

  const capitalized = payload
    .replace(patternOfFirstLetter, (match) => match.toUpperCase())
    .trim();

  return capitalized;
};
