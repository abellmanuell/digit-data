import fetcher from "../hooks/useFetch";

async function getUserData(token) {
  try {
    const request = await fetcher.get("/api/user", token);
    if (request.status >= 200 && request.status <= 299) {
      return request;
    } else if (request.status === 401) {
      const request = await fetcher.post("/api/refresh-token", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      console.log(request);

      if (request.status >= 200 && request.status <= 299) {
        localStorage.setItem("token", request.token);
        localStorage.setItem("refresh_token", request.refresh_token);
        return await getUserData(request.token);
      } else {
        throw new Error(token.message);
      }
    } else {
      throw new Error(data.message);
    }
  } catch (e) {
    throw new Error(e);
  }
}

const dashboardServices = { getUserData };

export default dashboardServices;
