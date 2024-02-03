import { useState } from "react";

type AuthUser = {
    name: string,
    email: string
};

const User = () => {
    // const [user, setUser] = useState<AuthUser | null>(null);
    const [user, setUser] = useState<AuthUser>({} as AuthUser);
    const handleLogin = () => {
        setUser({
            name: "Nam",
            email: "Nam@gmail.com"  
        })
    };
    // const handlLogout = () => {
        // setUser(null)
    // };
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            {/* <button onClick={handlLogout}>Logout</button> */}
            {/* <div>User Name is {user?.name}</div>
            <div>User Email is {user?.email}</div> */}
            <div>User Name is {user.name}</div>
            <div>User Email is {user    .email}</div>
        </div>
    );
};

export default User;