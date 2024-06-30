import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/cart.context';

const MenuItem = ({ item }) => { // Removed unnecessary prop
  const { addToCart } = useCart();
  
  return (
    <article className="menu-item">
      <Image src={item.image} alt={item.name} className="photo" width={250} height={250} objectFit="cover" />
      <div className="item-info">
        <header>
          <h4>{item.name}</h4>
          <h4 className="price">${item.price}</h4>
        </header>
        <p className="item-text">{item.description}</p>
        <button onClick={() => addToCart(item)} className="add-to-cart-btn">Add to Cart</button>
      </div>
    </article>
  );
};

export default MenuItem;
