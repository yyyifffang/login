'use client';

import React from "react";
import DataFetcher from "./service";
import '@/app/globals.css'

const DashboardPage = () => {
    return(
        <>
            <div className="p-6">
                <h1 className="text-2xl mb-4">MOCK DATA</h1>
                <DataFetcher/>
            </div>
        </>
    )
}

export default DashboardPage;