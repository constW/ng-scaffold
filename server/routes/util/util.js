export function removePrefix(url, prefix = '/middle/cii') {
  // eslint-disable-next-line no-useless-escape
  const replaceReg = new RegExp(`^${prefix.replace(/\//g, '\/')}`);
  return url.replace(replaceReg, '');
}
