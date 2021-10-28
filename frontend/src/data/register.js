import axios from "axios";
import keys from "../keys.js";
let registerMsg = ""

const register = async (firstName, lastName, username, password, email, history) => {
    const url = `${keys.apiHost}/register`;

    let axiosConfig = {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    }

    try {
        const res = await axios.post(url, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email,
        }, axiosConfig)
        
        console.log("Middleware Register res", res)
        return res;
    } catch (err) {
        return err.response;
    }
};

export default register;
