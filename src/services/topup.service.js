import fetcher from "../hooks/useFetch";

async function topUp(data, token) {
  try {
    const request = await fetcher.post("/api/topup", data, token);
    if (request.status >= 200 && request.status <= 299) {
      return request;
    } else if (request.status === 401) {
      fetcher.logout();
    } else {
      return request;
    }
  } catch (e) {
    console.error(e);
  }
}

async function buyData(data, token) {
  try {
    const request = await fetcher.post("/api/buy-data", data, token);
    if (request.status >= 200 && request.status <= 299) {
      return request;
    } else if (request.status === 401) {
      fetcher.logout();
    } else {
      return request;
    }
  } catch (e) {
    console.error(e);
  }
}

const topUpServices = { topUp, buyData };

export default topUpServices;
