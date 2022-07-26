function convertToSlug(Text: string) {
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

function isValidUsername(str: string) {
  return /^[a-zA-Z0-9_]{4,14}$/.test(str);
}

function excerpt(str: string, len: number) {
  if (str.length > len) {
    return `${str.substring(0, len)}...`;
  }
  return str;
}

// eslint-disable-next-line import/prefer-default-export
export { convertToSlug, isValidUsername, excerpt };
