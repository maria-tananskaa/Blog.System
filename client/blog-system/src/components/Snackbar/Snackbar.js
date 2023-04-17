import { Snackbar, Alert } from "@mui/material";
import { useSnackbarContext } from "../../contexts/SnackbarContext";

export function SnackbarComponent() {
    const { message, snackbarIsOpen, closeSnackbar } = useSnackbarContext();

    return (
        <Snackbar open={snackbarIsOpen} autoHideDuration={5000} onClose={closeSnackbar}>
            <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}