import { createContext, useState, useContext } from 'react';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({
    children,
}) => {
    const [message, setMessage] = useState("");
    const [snackbarIsOpen, setIsOpen] = useState(false);

    const openSnackbar = (message) => {
        setMessage(message);
        setIsOpen(true);
    };

    const closeSnackbar = () => {
        setIsOpen(false);
    };

    const contextValues = {
        message,
        snackbarIsOpen,
        openSnackbar,
        closeSnackbar
    };

    return (
        <>
            <SnackbarContext.Provider value={contextValues}>
                {children}
            </SnackbarContext.Provider>
        </>
    );
};

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext);

    return context;
};