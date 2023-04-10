import { createContext, useState, useContext } from 'react';
import * as authService from '../services/authService';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [registerIsOpen, setRegisterIsOpen] = useState(false);
    const [user, setUser] = useLocalStorage('user', {});

    const openLoginDialog = () => {
        setLoginIsOpen(true);
    };

    const closeLoginDialog = () => {
        setLoginIsOpen(false);
    };

    const openRegisterDialog = () => {
        setRegisterIsOpen(true);
    };

    const closeRegisterDialog = () => {
        setRegisterIsOpen(false);
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

    const onRegisterSubmit = async (data) => {
        try {
            const response = await authService.register(data);
            setUser(response);
            setRegisterIsOpen(false);
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
        registerIsOpen,
        accessToken: user.accessToken,
        userId: user._id,
        openLoginDialog,
        closeLoginDialog,
        openRegisterDialog,
        closeRegisterDialog,
        onLoginSubmit,
        onRegisterSubmit,
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