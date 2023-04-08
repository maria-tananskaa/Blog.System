import { createContext, useState, useContext } from 'react';
import * as authService from '../services/authService';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [user, setUser] = useLocalStorage('user', {});

    const openLoginDialog = () => {
        setLoginIsOpen(true);
    };

    const closeLoginDialog = () => {
        setLoginIsOpen(false);
    };

    const onLoginSubmit = async (data) => {
        try {
            const response = await authService.login(data);
            setUser(response);
            setLoginIsOpen(false);
        } catch (err) {
            console.log(err.message, "error");
        }
    };

    const onLogout = async () => {

        await authService.logout();
        setUser({});
    }

    const contextValues = {
        loginIsOpen,
        accessToken: user.accessToken,
        openLoginDialog,
        closeLoginDialog,
        onLoginSubmit,
        onLogout
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};