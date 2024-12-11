export async function useFetch(url, method = "GET", data = {}) {
  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (e) {
    throw new Error(e);
  }
}
