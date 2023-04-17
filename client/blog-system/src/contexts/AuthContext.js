import { createContext, useState, useContext } from 'react';
import * as authService from '../services/authService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSnackbarContext } from './SnackbarContext';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [registerIsOpen, setRegisterIsOpen] = useState(false);
    const [user, setUser] = useLocalStorage('user', {});
    const { openSnackbar } = useSnackbarContext();

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
        } catch (error) {
            openSnackbar(error.message);
        }
    };

    const onRegisterSubmit = async (data) => {
        try {
            const response = await authService.register(data);
            setUser(response);
            setRegisterIsOpen(false);
        } catch (error) {
            openSnackbar(error.message);
        }
    };

    const onLogout = async () => {
        try {
            await authService.logout();
            setUser({});
        } catch (error) {
            openSnackbar(error.message);
        }
    }

    const contextValues = {
        loginIsOpen,
        registerIsOpen,
        accessToken: user.accessToken,
        firstName: user.firstName,
        lastName: user.lastName,
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