import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'bottom-right'
    })
}
