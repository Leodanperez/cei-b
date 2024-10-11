import { toast } from "react-toastify";

interface ToastOptions {
    message: string;
    type: "success" | "error" | "info" | "warning",
    position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center",
    theme?: "light" | "dark" | "colored"
}

const showToast = ({
    message,
    type,
    position = "top-center",
    theme = "colored"
}: ToastOptions) => {
    toast[type](message, {
        position,
        theme
    });
};

export default showToast;