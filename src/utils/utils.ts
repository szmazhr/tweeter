function convertToSlug(Text: string) {
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}
// eslint-disable-next-line import/prefer-default-export
export { convertToSlug };
