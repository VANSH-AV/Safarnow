let getTokenImpl = null;

export function registerAuthTokenGetter(fn) {
  getTokenImpl = fn;
}

export async function getAuthToken() {
  if (!getTokenImpl) return null;
  try {
    return (await getTokenImpl()) || null;
  } catch {
    return null;
  }
}