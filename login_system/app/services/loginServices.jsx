import axios from "axios";

//用戶登入
const loginService = async(username, password)=>{
    try{
        const response = await axios.post('http://localhost:5000/api/login', { username, password });
        return response.data;
    }catch(error){
        console.error("Error during login:",error);
        throw error;
    };
}

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

export {loginService, fetchMockData};
