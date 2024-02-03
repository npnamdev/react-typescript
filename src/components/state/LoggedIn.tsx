import { useState } from "react";

type LoggedInProps = {
    // Define your specific prop types here
};

const LoggedIn = (props: LoggedInProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handlLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handlLogout}>Logout</button>
            <div>User is {isLoggedIn ? 'Logged in' : 'Logged out'}</div>
        </div>
    );
};

export default LoggedIn;