import React from 'react';
import Head from 'next/head';

const MenuDetails = ({ selectedItem }) => {
  if (!selectedItem) return null;

  return (
    <>
      <Head>
        <title>{selectedItem.name} | Menu Details</title>
        <meta name="description" content={selectedItem.description} />
      </Head>
      <div className="menu-details">
        <h2>{selectedItem.name}</h2>
        <p>${selectedItem.price}</p>
        <p>{selectedItem.description}</p>
      </div>
    </>
  );
};

export default MenuDetails;