import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const userDataContext = createContext()


const UserContext = ({ children }) => {

    const [user, setUser] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        email: '',
        password: ''
    })

    return (
        <userDataContext.Provider value={[user, setUser]}>
            <div>
                {children}
            </div>
        </userDataContext.Provider>
    )
}

export default UserContext