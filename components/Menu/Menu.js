import React, { useState, useMemo } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import Image from 'next/image';

// Define menuData directly in this file
const menuData = [
    {
        id: 1,
        category: 'Starters',
        name: 'Moroccan Variations',
        price: '$58',
        description: 'Selection of seasonal vegetables salads infused with the exotic flavors of Morocco.',
        image: 'https://www.riadjnaneimlil.com/uploads/1/2/0/8/120877187/all-moroccan-sallades.jpg'
    },
    {
        id: 2,
        category: 'Main Course',
        name: 'Lamb Tagine',
        price: '$75',
        description: 'Slow-cooked lamb with apricots, almonds, and Moroccan spices.',
        image: 'https://www.riadjnaneimlil.com/uploads/1/2/0/8/120877187/all-moroccan-sallades.jpg'
    },
    // More items...
];

const Menu = () => {
    const [filteredItems, setFilteredItems] = useState(menuData);

    const handleClick = (category) => {
        setFilteredItems(category === 'All' ? menuData : menuData.filter(item => item.category === category));
    };

    const uniqueCategories = useMemo(() => ['All', ...new Set(menuData.map(item => item.category))], []);

    return (
        <section className="menu">
            <div className="title">
                <h2>Our Menu</h2>
                <div className="underline"></div>
            </div>
            <div className="btn-container">
                {uniqueCategories.map(category => (
                    <button key={category} onClick={() => handleClick(category)} className="filter-btn" aria-label={`Show ${category}`}>
                        {category}
                    </button>
                ))}
            </div>
            <div className="section-center">
                {filteredItems.map(item => (
                    <MenuItem key={item.id} item={{
                        ...item, imageComponent: (
                            <Image src={item.image} alt={item.name} width={500} height={300} />
                        )
                    }} />
                ))}
            </div>
        </section>
    );
};

export default Menu;