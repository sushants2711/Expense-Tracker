export const categorySortAsc = async () => {
    try {
        const url = 'http://localhost:1200/api/expense/filter/title';
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