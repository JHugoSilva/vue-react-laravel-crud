import { createContext, useEffect, useState } from "react";


export const AppContext = createContext()

export default function AppProvider({ children }) {

    const [user, setUser] = useState(null)

    const [token, setToken] = useState(localStorage.getItem('token'))
    
    async function getUser() {
        const res = await fetch('/api/user',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await res.json()

        if (res.ok) {
            setUser(data);
        }

    }

    useEffect(()=>{
        if (token) {
            getUser()
        }
    },[])
    
    return <AppContext.Provider value={{ token, setToken, user, setUser }}>
        {children}
    </AppContext.Provider>
}