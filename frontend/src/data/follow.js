import axios from "axios";
import keys from "../keys.js";

const follow = async (curr_userid, userid) => {
    const url = `${keys.apiHost}/follow`;

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    }

    try {
        const res = await axios.post(url, {
            curr_userid: curr_userid,
            userid: userid
        }, axiosConfig)
     
        return res;
    } catch (err) {
        return err.response;
    }
};

const unfollow = async (curr_userid, userid) => {
    const url = `${keys.apiHost}/unfollow`;

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    }

    try {
        const res = await axios.post(url, {
            curr_userid: curr_userid,
            userid: userid
        }, axiosConfig)
     
        return res;
    } catch (err) {
        return err.response;
    }
};

const checkFollow = async (userid) => {
    const url = `${keys.apiHost}/check-follow`;

    var authtoken = localStorage.getItem('authtoken');

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
    };

    try {
        const res = await axios.post(url, {
            userid: userid
        }, axiosConfig);
     
        return res;
    } catch (err) {
        return err.response;
    }
};

const countFollowers = async (userid) => {
    const url = `${keys.apiHost}/count-followers`;

    var authtoken = localStorage.getItem('authtoken');

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
    };

    try {
        const res = await axios.post(url, {
            userid: userid
        }, axiosConfig);
     
        return res;
    } catch (err) {
        return err.response;
    }
};

const countFollowing = async (userid) => {
    const url = `${keys.apiHost}/count-following`;

    var authtoken = localStorage.getItem('authtoken');

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
    };

    try {
        const res = await axios.post(url, {
            userid: userid
        }, axiosConfig);
     
        return res;
    } catch (err) {
        return err.response;
    }
};

export default checkFollow;
export {follow, unfollow, countFollowers, countFollowing};