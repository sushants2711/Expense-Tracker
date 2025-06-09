export const handleCreateApiForUpdate = async (id, data) => {
    try {
        const url = `http://localhost:1200/api/expense/update/${id}`;
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