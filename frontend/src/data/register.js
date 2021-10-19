import axios from "axios";
import keys from "../keys.js";
let registerMsg = ""

const register = async (firstName, lastName, username, password, email) => {
    const url = `${keys.apiHost}/register`;
    console.log(firstName, lastName, username, password, email);

    try {
        const res = await axios.post(url, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email,
        })
        if(parseInt(res.data.status) <= 299){
            registerMsg = "Register Succesfully";
        }
        else{
            registerMsg = "Register Unsuccesfully - " + res.data.message;
        }
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export default register;
