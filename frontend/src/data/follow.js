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

const checkFollow = async (curr_userid, userid) => {
    const url = `${keys.apiHost}/check-follow`;

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    }

    try {
        const res = await axios.get(url, {
            curr_userid: curr_userid,
            userid: userid
        }, axiosConfig)
     
        return res;
    } catch (err) {
        return err.response;
    }
};

export default checkFollow;
export {follow, unfollow};