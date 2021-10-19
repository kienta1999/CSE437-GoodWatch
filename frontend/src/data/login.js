import axios from "axios";
import keys from "../keys.js";
let loginMsg = ""

axios.defaults.withCredentials = true;

const login = async (username, password, history) => {
    const url = `${keys.apiHost}/login`;

    try {
        const res = await axios.post(url, {
            username: username,
            password: password,
        })
        if(parseInt(res.data.status) <= 299){
            loginMsg = "Login Succesfully";
            history.push("/");
        }
        else{
            loginMsg = res.data.message;
        }
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export default login;
