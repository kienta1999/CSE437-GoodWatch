import axios from "axios";
import keys from "../keys.js";

const logout = async (history) => {
    const url = `${keys.apiHost}/logout`;

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    }

    try {
        const res = await axios.post(url, {}, axiosConfig)
     
        if(parseInt(res.status) <= 299){
            console.log(res)
            //actually delete local storage to log out
            localStorage.removeItem('user')
            history.push("/login");
        }
        return res;
    } catch (err) {
        return err.response;
    }
};

export default logout;