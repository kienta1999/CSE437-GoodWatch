import axios from "axios";
import keys from "../keys.js";

const logout = async (history) => {
    const url = `${keys.apiHost}/logout`;

    var authtoken = localStorage.getItem('authtoken')

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json", "authtoken":authtoken}
    }

    try {
        const res = await axios.post(url, {}, axiosConfig)
     
        if(parseInt(res.status) <= 299){
            console.log(res)

            localStorage.removeItem('authtoken')
            history.push("/login");
        }
        return res;
    } catch (err) {
        return err.response;
    }
};

export default logout;