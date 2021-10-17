import axios from "axios";
import keys from "../keys.js";
let loginMsg = ""

const register = async (username, password) => {
    const url = `${keys.apiHost}/login`;
    axios.post(url, {
        username: username,
        password: password,
    }).then((res) => {
        if(parseInt(res.data.status) <= 299){
            loginMsg = "Login Succesfully";
        }
        else{
            loginMsg = res.data.message;
        }
        res.data["login_status"] = loginMsg;
        return res.data;
    }).catch((error) => {
        console.log(error);
    })
};

export default register;
