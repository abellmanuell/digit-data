import fetcher from "../hooks/useFetch";

async function refreshToken() {
  const request = await fetcher.post(
    "/api/refresh-token",
    {
      refresh_token: localStorage.getItem("refresh_token"),
    },
    localStorage.getItem("token")
  );

  if (request.status >= 200 && request.status <= 299) {
    localStorage.setItem("token", request.token);
    localStorage.setItem("refresh_token", request.refresh_token);
    return request.token;
  } else {
    return request;
  }
}

const refreshTokenRequest = refreshToken;

export default refreshTokenRequest;
