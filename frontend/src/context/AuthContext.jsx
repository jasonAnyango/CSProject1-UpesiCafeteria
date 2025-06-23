import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

// Create the AuthContext, which will hold the authentication state and methods
export const AuthContext = createContext()

// AuthProvider component to provide authentication state and methods to the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    // useEffect to check for a token in localStorage when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                // Decode the token to get user information
                const decodedUser = jwtDecode(token)
                // Check if the token has expired
                if (decodedUser.exp * 1000 < Date.now()) {
                    // Call the logout function if the token is expired
                    logout()
                } else {
                    // Set the user state with the stored user information
                    const storedUser = JSON.parse(localStorage.getItem('user'))
                    setUser(storedUser)
                }
            } catch (error) {
                console.error('Error decoding token:', error)
                logout()
            }
        }
    }, [])
    
    // Logout function to clear user data and redirect to login page
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            { children }
        </AuthContext.Provider>
    )
}