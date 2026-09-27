import {useEffect,useState} from 'react';
import {admin} from '../api/resources';
export default function Reviews(){
    const [d,setD]=useState([]);
    const load=()=>admin.reviews().then(r=>setD(r.data.data));
    useEffect(() => {
    load();
}, []);
    return <section><h1>Review moderation</h1>
    <div className="list">{d.map(r=><article className="card" key={r._id}><strong>{r.product?.name}</strong>
    <p>{r.user?.name}: {r.body}</p>
    <button className="link-btn" onClick={()=>admin.moderateReview(r._id,{isPublished:!r.isPublished}).then(load)}>
        {r.isPublished?'Hide':'Publish'}
        </button></article>)}
        </div></section>}
        
import React from "react";