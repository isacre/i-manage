export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
}

export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; secure; max-age=3600`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; secure; max-age=0`;
}
