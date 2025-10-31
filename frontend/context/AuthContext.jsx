/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token')||null)

    useEffect(()=>{
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setUser(decoded)
                localStorage.setItem('token', token)
            } catch(e){
                console.error('Invalid token', e)
                setToken(null)
                setUser(null)
        }
        }else{
            setUser(null)
            localStorage.removeItem('token')
        }
    },[token])

    const login = (token)=>{
        setToken(token)
    }
    const logout = ()=>{
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
    }

    return(
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}