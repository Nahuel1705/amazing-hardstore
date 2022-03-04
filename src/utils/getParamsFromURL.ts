export const getParamsFromURL = (url: string, params: string[]) => {
  const queryString = url.slice(url.indexOf('?')).replaceAll('_', '');
  const urlParams = new URLSearchParams(queryString);
  const results: Record<string, any> = {};

  params.forEach(param => (results[param] = urlParams.get(param) || null));
  //
  return results;
};
