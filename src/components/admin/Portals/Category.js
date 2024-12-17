const category = async () => {
    try{
        const response=await fetch('https://api.escuelajs.co/api/v1/categories');
        const data=await response.json();
        return data;
    } catch(error) {
        console.log("Bad API",error);
        return [];
    }
}

export default category;