'use client';

import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { fetchMockData } from "./service";
import '@/app/globals.css'

const DashboardPage = () => {
    const [data,setData] = useState(null);
    const {user, isAuthenticated}= useSelector((state) => state.auth);

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
            <div className="p-6">
                <h1 className="text-2xl mb-4">MOCK DATA</h1>
                {data ? (
                <pre className="p-4 bg-gray-100 border rounded overflow-auto max-h-96">
                    {JSON.stringify(data, null, 2)}
                </pre>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default DashboardPage;