export const handleCreateApiForUpdate = async (id, data) => {
    try {
        const url = `https://expense-tracker-backend-np3s.onrender.com/api/expense/update/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};