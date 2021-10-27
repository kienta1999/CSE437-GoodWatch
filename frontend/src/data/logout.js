import axios from "axios";
import keys from "../keys.js";

const logout = async (history) => {
    const url = `${keys.apiHost}/logout`;

    try {
        const res = await axios.get(url, {})
     
        if(parseInt(res.status) <= 299){
            console.log(res)
            //actually delete token to log out
            localStorage.removeItem('token')
            history.push("/login");
        }
        return res;
    } catch (err) {
        return err.response;
    }
};

export default logout;