import fetcher from "../hooks/useFetch";

async function getTransactions(data, token) {
  try {
    const request = await fetcher.post(
      "/api/transactions/" + data._id,
      data,
      token
    );
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

const transactionsServices = { getTransactions };

export default transactionsServices;
