export const descendingSort = async () => {
    try {
        const url = 'https://expense-tracker-backend-np3s.onrender.com/api/expense/filter/amount/dsc';
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};