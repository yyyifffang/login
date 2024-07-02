'use client'

import axios from "axios";
import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";

//獲取mock api data
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

const DataFetcher = () => {
    const [data,setData] = useState(null);
    const {isAuthenticated} = useSelector((state)=>state.auth);

    useEffect(()=>{
        const getData = async()=>{
            const result = await fetchMockData();
            setData(result);
        };

        if(isAuthenticated){
            getData();
        }
    },[isAuthenticated]);

    if (!isAuthenticated){
        return <p>Please log in to view the dashboard.</p>;
    }

    return(
        <>
            {data ? (
                <pre className="p-4 bg-gray-100 border rounded overflow-auto max-h-96">
                    {JSON.stringify(data, null, 2)}
                </pre>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default DataFetcher;



export {fetchMockData}