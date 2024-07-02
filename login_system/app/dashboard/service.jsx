import axios from "axios";

//獲取mock數據
const fetchMockData = async() => {
    try{
        const response = await axios.get('https://stablecoins.llama.fi/stablecoins',{
            params: {includePrices: true},
        });
        return response.data;
    }catch(error){
        console.error("Error fetching mock data:",error);
        throw error;
    }
    
};

export {fetchMockData}