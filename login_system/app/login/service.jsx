import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "../features/authSlice";

//用戶登入api
const loginService = async(username, password)=>{
    try{
        const response = await axios.post('http://localhost:5000/api/login', { username, password });
        return response.data;
    }catch(error){
        console.error("Error during login:",error);
        throw error;
    };
}

//處理登入邏輯
const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const user = await loginService(username,password);
            dispatch(login(user));
            router.push('/dashboard');
        }catch(error) {
            console.error('Login failed : ', error);
        }
    };
    return{
        username,
        setUsername,
        password,
        setPassword,
        handleLogin
    }
};

export default useLogin