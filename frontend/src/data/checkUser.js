import axios from "axios";
import keys from "../keys.js";

const checkUser = async (userid) => {
    
    try {
        const url = `${keys.apiHost}/user/${userid}`;
        const response = await axios.get(url);
        return response;
    } catch (err) {
        return err.response;
    }
};

export default checkUser;