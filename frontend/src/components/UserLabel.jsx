/* Reference: https://github.com/machadop1407/React-Search-Bar */
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const UserLabel = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(props.users);
    });

    return (
        <div>
            {users.map((user) => {
                return (
                        <a href={`/user/${user.id}`}>
                            <Button variant="light" size="sm">
                                {user.username}
                            </Button>
                            {" "}
                        </a>
                );
            })}
        </div>
    );
};

export default UserLabel;