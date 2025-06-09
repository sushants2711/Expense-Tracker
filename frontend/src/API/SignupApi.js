export const handleSignupApi = async (data) => {
    try {
        const url = "https://expense-tracker-backend-np3s.onrender.com/api/auth/signup";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        const result = await response.json();
        return result;
        
    } catch (error) {
        throw new Error(error.message);
    };
};