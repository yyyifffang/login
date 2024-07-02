'use client';

import React,{useState} from "react";
import useLogin from "./service";
import '@/app/globals.css'

const LoginPage = () => {
    //從userLogin hook中解構出狀態和方法
    const {username,setUsername,password,setPassword,handleLogin} = useLogin();

    return(
        <div 
            className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-1/3">
                <h2 className="text-2xl mb-4 text-center">使用者登入</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage;