
import React, { createContext, useContext, useState, useEffect } from "react";
import {auth} from '../api/resources';
const C=createContext(null);
export function AuthProvider({children}){
    const [user,setUser]=useState(null),
    [loading,setLoading]=useState(true);
    
    useEffect(()=>{auth.me().then(r=>setUser(r.data.data.user)).catch(()=>setUser(null)).finally(()=>setLoading(false));},[]);const login=async d=>{const r=await auth.login(d);setUser(r.data.data.user);return r};const register=async d=>{const r=await auth.register(d);setUser(r.data.data.user);return r};const logout=async()=>{try{await auth.logout()}finally{setUser(null)}};return <C.Provider value={{user,loading,login,register,logout}}>{children}</C.Provider>}export const useAuth=()=>useContext(C);
