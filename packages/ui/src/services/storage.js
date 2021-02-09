export function get(key) {
  const value = window.localStorage.getItem(key);

  return value && JSON.parse(value);
}

export function set(key, value = {}) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}

export function remove(key) {
  return window.localStorage.removeItem(key);
}
