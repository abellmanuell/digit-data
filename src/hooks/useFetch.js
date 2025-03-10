async function get(url, token) {
  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : null,
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
        Authorization: token ? `Bearer ${token}` : null,
      },
      credentials: "include",
      body: data ? JSON.stringify(data) : null,
    });

    const responseData = await response.json();
    return responseData;
  } catch (e) {
    throw new Error(e);
  }
}

async function put(url, data = {}, token) {
  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : null,
      },
      credentials: "include",
      body: data ? JSON.stringify(data) : null,
    });

    const responseData = await response.json();
    return responseData;
  } catch (e) {
    throw new Error(e);
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "/signin";
}
const fetcher = { get, post, put, logout };

export default fetcher;
