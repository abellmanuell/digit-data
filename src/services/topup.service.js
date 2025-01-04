import fetcher from "../hooks/useFetch";
import refreshToken from "../utils/refreshTokenRequest";

async function topUp(data, token) {
  try {
    const request = await fetcher.post("/api/topup", data, token);
    if (request.status >= 200 && request.status <= 299) {
      return request;
    } else if (request.status === 401) {
      const token = await refreshToken();
      return await topUp(data, token);
    } else {
      throw new Error(request.message);
    }
  } catch (e) {
    return e;
  }
}

const topUpServices = { topUp };

export default topUpServices;
