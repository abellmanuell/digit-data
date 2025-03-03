import fetcher from "../hooks/useFetch";
import refreshToken from "../utils/refreshTokenRequest";

async function getUserData(token) {
  try {
    const request = await fetcher.get("/api/user", token);
    if (request.status >= 200 && request.status <= 299) {
      return request;
    } else if (request.status === 401) {
      const token = await refreshToken();

      if (token.status !== 404) {
        return await getUserData(token);
      } else {
        localStorage.clear();
      }
    } else {
      throw new Error(data.message);
    }
  } catch (e) {
    console.log(e);

    throw new Error(e);
  }
}

async function updateUser(data, token) {
  try {
    const request = await fetcher.put("/api/user/profile/edit", data, token);
    if (request.status >= 200 && request.status <= 299) {
      return request;
    } else if (request.status === 401) {
      const token = await refreshToken();

      if (token.status !== 404) {
        return await updateUser(data, token);
      } else {
        localStorage.clear();
      }
    } else {
      localStorage.clear();
      throw new Error(request.message);
    }
  } catch (e) {
    throw new Error(e);
  }
}

const userServices = { getUserData, updateUser };

export default userServices;
