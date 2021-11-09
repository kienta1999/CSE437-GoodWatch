import axios from "axios";
import keys from "../keys.js";

const createList = async (listName) => {
    const url = `${keys.apiHost}/create-list`;

    var authtoken = localStorage.getItem('authtoken')

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
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

    var authtoken = localStorage.getItem('authtoken')

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
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

const removeFromList = async (selectedlist, movieid) => {
    const url = `${keys.apiHost}/remove-from-list`;

    var authtoken = localStorage.getItem('authtoken')

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
    }

    try {
        const res = await axios.post(url, {
            listId: selectedlist,
            movieId: movieid
        }, axiosConfig)
        
        console.log("Middleware remove from list res", res)
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
        const res = await axios.post(url, {}, axiosConfig)
        
        console.log("Middleware get lists res", res)
        return res;
    } catch (err) {
        return err.response;
    }
};

const getListContent = async (selectedlist) => {
    const url = `${keys.apiHost}/get-list-content`;

    var authtoken = localStorage.getItem('authtoken')

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
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
export { addToList, removeFromList, getLists, getListContent };