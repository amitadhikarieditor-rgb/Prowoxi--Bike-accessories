import React,{useEffect} from 'react';
export default function NotFound(){
    useEffect(() => {
        document.title = 'ERROR- PROWOXI';
    }, []);


    return <section><h1>404</h1><p>Page not found.</p></section>}