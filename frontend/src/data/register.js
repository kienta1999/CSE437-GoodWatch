import axios from "axios";
import keys from "../keys.js";
let registerMsg = ""

const register = async (firstName, lastName, username, password, email, history) => {
    const url = `${keys.apiHost}/register`;

    try {
        const res = await axios.post(url, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email,
        })

        // if(parseInt(res.status) <= 299){
        //     history.push("/");
        // }
        console.log("Middleware Register res", res)
        return res;
    } catch (err) {
        return err.response;
    }
};

export default register;
