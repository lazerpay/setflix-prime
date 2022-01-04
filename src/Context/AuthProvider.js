import React from 'react';
import { auth } from '../firebase.config';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = React.useState();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, []);

    

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut();
    }

    const value = {
        currentUser,
        signup,
        login,
        logout,
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
