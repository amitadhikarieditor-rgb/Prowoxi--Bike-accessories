import {useEffect,useState} from 'react';
import {admin,products} from '../api/resources';
export default function Products(){
    const [d,setD]=useState([]);
    const load=()=>products.list({limit:100}).then(r=>setD(r.data.data));
    useEffect(() => {
    load();
}, []);
    return <section><h1>Products</h1>
    <div className="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Active</th>
                    <th/>
                </tr>
            </thead>
                    <tbody>{d.map(p=><tr key={p._id}>
                        <td>{p.name}</td>
                        <td>₹{p.price}</td>
                        <td>{p.stock}</td>
                        <td>{p.isActive?'Yes':'No'}</td>
                        <td><button className="link-btn" onClick={()=>admin.deleteProduct(p._id).then(load)}>Archive</button>
                        </td></tr>)}</tbody>
                        </table></div>
                        </section>}
import React from "react";