import {useEffect,useState} from 'react';
import {wishlist} from '../api/resources';
import ProductCard from '../components/ProductCard';
export default function Wishlist(){const [d,setD]=useState([]);
    const load=()=>wishlist.get().then(r=>setD(r.data.data.products||[]));
    useEffect(() => {
    load();
}, []);
      return (
    <section>
      <h1>Wishlist</h1>

      <div className="grid">
        {d.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onWishlist={async (id) => {
              await wishlist.toggle(id);
              load();
            }}
          />
        ))}
      </div>
    </section>
  )}

import React from "react";