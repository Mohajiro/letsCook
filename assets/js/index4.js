const dataLoading = async(url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data: ', error)
    }
}

console.log(dataLoading());