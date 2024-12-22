async function get(url, token) {
  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    });

    const responseData = await response.json();
    return responseData;
  } catch (e) {
    throw new Error(e);
  }
}

async function post(url, data = {}, token) {
  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
      body: data ? JSON.stringify(data) : "",
    });

    const responseData = await response.json();
    return responseData;
  } catch (e) {
    throw new Error(e);
  }
}

const fetcher = { get, post };

export default fetcher;
