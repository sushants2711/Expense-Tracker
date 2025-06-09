export const handleLogoutApi = async () => {
    try {
        const url = `https://expense-tracker-backend-np3s.onrender.com/api/auth/logout`;
        const response = await fetch (url, {
            method: "POST",
            credentials: "include"
        });

        const result = await response.json();
        return result;
        
    } catch (error) {
        throw new Error(error.message);
    };
};