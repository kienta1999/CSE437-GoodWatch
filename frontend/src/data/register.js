import axios from "axios";
import keys from "../keys.js";
let registerMsg = ""

const register = async (firstName, lastName, username, password, email) => {

    const url = `${keys.apiHost}/register`;
    console.log(firstName, lastName, username, password, email);
    axios.post(url, {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        email: email,
    }).then((res) => {
        console.log(res.data);
        if(parseInt(res.data.status) <= 299){
            registerMsg = "Register Succesfully";
        }
        else{
            registerMsg = "Register Unsuccesfully - " + res.data.message;
        }
        res.data["register_status"] = registerMsg;
        return res.data;
    }).catch((error) => {
        console.log(error);
    })
};

export default register;
