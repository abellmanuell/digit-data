import fetcher from "../hooks/useFetch";

async function getUserData(token) {
  try {
    const request = await fetcher.get("/api/user", token);
    if (request.status >= 200 && request.status <= 299) {
      return request;
    } else if (request.status === 401) {
      localStorage.clear();
      return request;
    } else {
      return request;
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function updateUser(data, token) {
  try {
    const request = await fetcher.put("/api/user/profile/edit", data, token);
    if (request.status >= 200 && request.status <= 299) {
      return request;
    } else if (request.status === 401) {
      localStorage.clear();
      return request;
    } else {
      return request;
    }
  } catch (e) {
    throw new Error(e);
  }
}

const userServices = { getUserData, updateUser };

export default userServices;
