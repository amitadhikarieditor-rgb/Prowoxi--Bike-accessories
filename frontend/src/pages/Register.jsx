import {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
export default function Register(){
    const {register}=useAuth(),
    nav=useNavigate(),
    [f,setF]=useState({name:'',email:'',password:''}),
    [error,setError]=useState('');
    const s=async e=>{e.preventDefault();
        try{
            await register(f);nav('/')
        }catch(e){
            setError(e.response?.data?.message||'Registration failed')}};
            return <section className="auth"><form className="form card" onSubmit={s}><span className="eyebrow">PROWOXI</span><h1>Create account</h1>{error&&<div className="alert">{error}</div>}<input required placeholder="Full name" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/><input required type="email" placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/><input required minLength="8" type="password" placeholder="Password" value={f.password} onChange={e=>setF({...f,password:e.target.value})}/><button className="btn">Create account</button><p className="muted">Already have an account? <Link to="/login">Log in</Link></p></form></section>}
import React from "react";