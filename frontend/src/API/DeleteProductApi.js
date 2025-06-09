export const handleDeleteProductApi = async (id) => {
    try {
        const url = `https://expense-tracker-backend-np3s.onrender.com/api/expense/delete/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};