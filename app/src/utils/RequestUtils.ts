export function getUrlWithPrefix (url: string): string {
  const urlPrefix = process.env.REACT_APP_URL_PREFIX
  if(urlPrefix){
    return urlPrefix + url
  }
  return url
}
