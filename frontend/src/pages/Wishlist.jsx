import {useEffect,useState} from 'react';
import {wishlist} from '../api/resources';
import ProductCard from '../components/ProductCard';
export default function Wishlist(){
  
  const [data,Setdata]=useState([]);

    const load=()=>wishlist.get().then(r=>Setdata(r.data.data.products||[]));

    useEffect(() => {
      document.title = 'PROWOXI - Wishlist';
    load();
}, []);

      return (
    <section>
      <h1>Wishlist</h1>

      <div className="grid">{
            data.map((Prod) => (
            <ProductCard
            key={Prod._id}

            product={Prod}
            onWishlist={async (id) => {

              await wishlist.toggle(id);
              load();
            }}
          />
           ))
        }
      </div>
    </section>
  )}

import React from "react";