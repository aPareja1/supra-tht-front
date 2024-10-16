export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function saveObjectAsBase64(key: string, obj: object): void {
  const jsonString = JSON.stringify(obj);
  const base64String = btoa(jsonString);
  localStorage.setItem(key, base64String);
}

export function readObjectFromBase64(key: string): object | null {
  const base64String = localStorage.getItem(key);
  if (!base64String) {
    return null;
  }
  const jsonString = atob(base64String);
  return JSON.parse(jsonString);
}
