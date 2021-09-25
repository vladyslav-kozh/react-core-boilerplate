export const toUrl = (pathname: string) => `${process.env.PUBLIC_URL}${pathname}`
export const parseQueryString = (url?: string, param?: string) => {
    const queryString = url?.replace(/.*\?/, '');

    if (queryString === url || !queryString) {
      return null;
    }
    const urlParams = new URLSearchParams(queryString);
    const result: any = {};

    urlParams.forEach((val, key) => {
      if (result.hasOwnProperty(key)) {
        result[key] = [result[key], val];
      } else {
        result[key] = val;
      }
    });
    if (param !== undefined)
      return result[param]
    else
      return ""
  }
