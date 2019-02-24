import axios from "axios";

const apiClent = axios.create({
  baseURL: "https://min-api.cryptocompare.com/data/top/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization:
      "Apikey 31ed75565f577806c73b782d100e5419a07e498b1e82b53b0d402c7ea92b5b70"
  }
});

export default {
  getMrktCap() {
    return apiClent.get("mktcapfull?limit=20&tsym=USD");
  }
};
