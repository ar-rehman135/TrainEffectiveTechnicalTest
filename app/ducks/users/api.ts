import axios from "axios";

export default {
  getUsersRequest: async ({ keyword }) => {
    return await axios.get(`https://api.github.com/search/users?q=${keyword? keyword: ''} in:login`);
  },
};
