import axios from "axios";
import keys from "../keys.js";
import axiosConfig from "./axiosConfig";

const createList = async (listName) => {
  const url = `${keys.apiHost}/create-list`;

  try {
    const res = await axios.post(
      url,
      {
        listName: listName,
      },
      axiosConfig
    );

    console.log("Middleware create list res", res);
    return res;
  } catch (err) {
    return err.response;
  }
};

const addToList = async (selectedlists, movieid) => {
  const url = `${keys.apiHost}/add-to-list`;

  try {
    const res = await axios.post(
      url,
      {
        lists: selectedlists,
        movieId: movieid,
      },
      axiosConfig
    );

    console.log("Middleware add to list res", res);
    return res;
  } catch (err) {
    return err.response;
  }
};

const changeList = async (newlist, movieid) => {
    const url = `${keys.apiHost}/change-list`;

    var authtoken = localStorage.getItem('authtoken')

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
    }

    try {
        const res = await axios.post(url, {
            listId: newlist,
            movieId: movieid
        }, axiosConfig)
        
        console.log("Middleware update list res", res)
        return res;
    } catch (err) {
        return err.response;
    }
};

const removeFromList = async (selectedlists, movieid) => {
  const url = `${keys.apiHost}/remove-from-list`;

  var authtoken = localStorage.getItem('authtoken')

  let axiosConfig = {
    withCredentials: true,
    headers: {"Content-Type":"application/json", "authtoken":authtoken}
  }

  try {
    const res = await axios.post(
      url,
      {
        lists: selectedlists,
        movieId: movieid,
      },
      axiosConfig
    );

    console.log("Middleware remove from list res", res);
    return res;
  } catch (err) {
    return err.response;
  }
};

const getLists = async () => {
  const url = `${keys.apiHost}/get-lists`;

  var authtoken = localStorage.getItem('authtoken')

  let axiosConfig = {
      withCredentials: true,
      headers: {"Content-Type":"application/json", "authtoken":authtoken}
  }

  try {
    const res = await axios.post(url, {}, axiosConfig);

    console.log("Middleware get lists res", res);
    return res;
  } catch (err) {
    return err.response;
  }
};

const checkList = async (movieid, possibleListIds) => {
    const url = `${keys.apiHost}/check-list`;

    var authtoken = localStorage.getItem('authtoken')

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
    }

    try {
        const res = await axios.post(url, {
            movieId: movieid,
            possibleListIds: possibleListIds
        }, axiosConfig)
        
        console.log("Middleware check list res", res)
        return res;
    } catch (err) {
        return err.response;
    }
};

const getListContent = async (selectedlist) => {
  const url = `${keys.apiHost}/get-list-content`;

  try {
    const res = await axios.post(
      url,
      {
        listId: selectedlist,
      },
      axiosConfig
    );

    console.log("Middleware get list content res", res);
    return res;
  } catch (err) {
    return err.response;
  }
};

export default createList;
export { addToList, changeList, removeFromList, getLists, checkList, getListContent };
