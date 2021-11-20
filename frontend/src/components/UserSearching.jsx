/* Reference: https://github.com/machadop1407/React-Search-Bar */

import { useState } from "react";
import "./UserSearching.css"

const UserSearching = (props) => {
    const [query, setQuery] = useState("");
    const [shown, setShown] = useState([]);

    const handleSearch = async (e) => {
        let query = e.target.value;
        const filtered = props.userList.filter((user) => {
            return user.username.toLowerCase().includes(query.toLowerCase());
        });

        if (query === "") {
            setShown([]);
        } else {
            setShown(filtered);
        }

        setQuery(query);
    };

    return (
        <div>
            <input type="text" placeholder="Search Users" onChange={handleSearch} />
            {shown.length != 0 && (
                <div className="dataResult">
                    {shown.slice(0, 5).map((value) => {
                        return (
                            <a className="dataItem" href={`/user/${value.id}`}>
                                <p>{value.username}</p>
                            </a>
                        );
                    })}
                </div>
            )}
            {shown.length == 0 && query != "" && (
                <div className="dataResult">
                    <div className="dataItem"> 
                        <p>{"No results found"}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSearching;