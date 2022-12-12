import React from 'react'
import { UserAuth } from "../context/AuthContext"

const Sidebar = () => {
    const { user: { fullName, userName, userId } } = UserAuth();

    console.log("FullName,username, userId", fullName, userName, userId);
    return (
        <div>Sidebar</div>
    )
}

export default Sidebar