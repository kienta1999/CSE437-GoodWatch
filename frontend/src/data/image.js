import axios from "axios";
import keys from "../keys.js";

const getMoviePoster = async (movieid) => {
   const url = `https://imdb-api.com/API/Images/k_ky621lt9/${movieid}`;
    const res = await axios.get(url);
    if (res.status === 200) {
      const data = res.data.items[0].image;
      return data;
    }
    return null;
  };

  export default getMoviePoster;