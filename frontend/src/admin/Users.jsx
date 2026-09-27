import {useEffect,useState} from 'react';
import {admin} from '../api/resources';
export default function Users(){

    const [d,setD]=useState([]);

    const load=()=>admin.users()
    .then(r=>setD(r.data.data));
    useEffect(() => {
    load();
}, []);
    return <section>
        <h1>Users</h1>
        <div className="table-wrap">
            <table><thead>
                <tr><th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th/></tr></thead>
                <tbody>{d.map(u=>
                    <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>{u.isActive?'Active':'Disabled'}
                            </td><td>
                                <button className="link-btn" onClick={()=>admin.setUserStatus(u._id,{isActive:!u.isActive}).then(load)}>
                                    {u.isActive?'Disable':'Enable'}</button>
                                    </td></tr>)}</tbody>
                                    </table></div></section>}
import React from "react";