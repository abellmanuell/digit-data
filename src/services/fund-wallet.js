import fetcher from "../hooks/useFetch";

async function fundWallet(data, token) {
  try {
    const request = await fetcher.post("/api/fund-wallet", data, token);
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

const fundWalletServices = { fundWallet };

export default fundWalletServices;
