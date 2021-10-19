import axios from "axios";
import keys from "../keys.js";
let registerMsg = ""

const register = async (firstName, lastName, username, password, email) => {
    const url = `${keys.apiHost}/register`;

    try {
        const res = await axios.post(url, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email,
        })

        if(parseInt(res.status) <= 299){
            registerMsg = "Register Succesfully";
        }
        return res;
    } catch (err) {
        return err.response;
    }
};

export default register;
