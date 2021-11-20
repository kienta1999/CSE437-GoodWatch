import axios from "axios";
import keys from "../keys.js";
import axiosConfig from "./axiosConfig";

const getAllUsers = async () => {
    const url = `${keys.apiHost}/all-users`;

    var authtoken = localStorage.getItem('authtoken');

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
    };

    try {
        const res = await axios.post(url, {}, axiosConfig);
        return res;
    } catch (err) {
        return err.response;
    }
};

export default getAllUsers;