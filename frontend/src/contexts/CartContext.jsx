import React,{createContext,useContext,useEffect,useState} from 'react';
import {cart} from '../api/resources';
import {useAuth} from './AuthContext';
const C=createContext(null);
export function CartProvider({children}){const {user}=useAuth();
const [data,setData]=useState(null);
const load=async()=>{if(!user){setData(null);
    return}
    try{
        setData((await cart.get()).data.data)
    }catch{
        setData(null)}};
        useEffect(()=>{load()},
        [user]);
        const add=async d=>{
            const r=await cart.add(d);
            setData(r.data.data);
            return r};
            const remove=async id=>{
                const r=await cart.remove(id);
                setData(r.data.data)};
                return <C.Provider value={{cart:data,refresh:load,add,remove}}>{children}</C.Provider>}export const useCart=()=>useContext(C);
