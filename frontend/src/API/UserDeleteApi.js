export const deleteUserApi = async (body) => {
    try {
        const url = "https://expense-tracker-backend-np3s.onrender.com/api/auth/account/delete";
        const response = await fetch(url, {
            method: "DELETE",
              headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};