import axios from "axios";
import keys from "../keys.js";

const createList = async (listName) => {
    const url = `${keys.apiHost}/create-list`;

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    }

    try {
        const res = await axios.post(url, {
            listName: listName
        }, axiosConfig)
        
        console.log("Middleware create list res", res)
        return res;
    } catch (err) {
        return err.response;
    }
};

const addToList = async (selectedlist, movieid) => {
    const url = `${keys.apiHost}/add-to-list`;

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    }

    try {
        const res = await axios.post(url, {
            listId: selectedlist,
            movieId: movieid
        }, axiosConfig)
        
        console.log("Middleware add to list res", res)
        return res;
    } catch (err) {
        return err.response;
    }
};

const getLists = async () => {
    const url = `${keys.apiHost}/get-lists`;

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    }

    try {
        const res = await axios.post(url, {}, axiosConfig)
        
        console.log("Middleware get lists res", res)
        return res;
    } catch (err) {
        return err.response;
    }
};

const getListContent = async (selectedlist) => {
    const url = `${keys.apiHost}/get-list-content`;

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    }

    try {
        const res = await axios.post(url, {
            listId: selectedlist,
        }, axiosConfig)
        
        console.log("Middleware get list content res", res)
        return res;
    } catch (err) {
        return err.response;
    }
};

export default createList;
export { addToList, getLists, getListContent };