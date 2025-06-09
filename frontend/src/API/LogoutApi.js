export const handleLogoutApi = async () => {
    try {
        const url = `http://localhost:1200/api/auth/logout`;
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