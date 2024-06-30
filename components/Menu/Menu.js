import React, { useState, useMemo } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import Image from 'next/image';

const menuData = [
    {
        id: 1,
        category: 'Starters',
        name: 'Moroccan Variations',
        price: '58',
        description: 'Selection of seasonal vegetables salads infused with the exotic flavors of Morocco.',
        image: 'https://www.riadjnaneimlil.com/uploads/1/2/0/8/120877187/all-moroccan-sallades.jpg'
      },
      {
        id: 2,
        category: 'Starters',
        name: 'Mixed Briouates',
        price: '85',
        description: 'Crispy Moroccan phyllo dough with ricotta and thyme, Slaoui zucchini and mint, chicken and lemon, spinach, yogurt, mustard, and curry sauce.',
        image: 'https://static1.squarespace.com/static/54d4153ce4b00c0e483c13a6/54da87cae4b0fa0ca47b4f97/56aa8326ab28106f818584e8/1699635026403/Pistachios+and+hazelnuts+briouates+-12.jpg?format=1500w'
      },
      {
        id: 3,
        category: 'Starters',
        name: 'Berkoukech Salad',
        price: '104',
        description: 'Special hand-rolled Moroccan pasta with sauteed vegetables, carrots, zucchini, white turnips, ginger, onions, and parsley sauce.',
        image: 'https://images.squarespace-cdn.com/content/v1/54d4153ce4b00c0e483c13a6/1453403238279-MRZHTLORK3BTH3KN07WU/image-asset.jpeg'
      },
      {
        id: 4,
        category: 'Starters',
        name: 'Sardinia Style Salad',
        price: '135',
        description: 'Prawns, roasted tomato, black avocado, crispy leeks.',
        image: 'https://grantourismotravels.com/wp-content/uploads/2023/01/Balela-Salad-Recipe-Warm-Chickpea-Salad-Middle-East-Copyright-2023-Terence-Carter-Grantourismo-T-500x375.jpg'
      },
      {
        id: 5,
        category: 'Starters',
        name: 'Spaghetti 2 Zucchini',
        price: '126',
        description: 'Slaoui zucchini cream, sauteed zucchini, chopped capers, aromatic crumble.',
        image: 'https://www.the-pasta-project.com/wp-content/uploads/Spaghetti-alla-Nerano-with-fried-zucchini-6.jpg'
      },
      {
        id: 6,
        category: 'Starters',
        name: 'Pumpkin Soup',
        price: '99',
        description: 'Potato, organic yogurt, cumin, poppy seeds, and croutons topping.',
        image: 'https://www.foodandwine.com/thmb/ImpUk-9LQ63WkHx-NPz4KMIXZ2k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Thai-Pumpkin-Soup-FT-RECIPE0822-2000-83b6bfa1708f41b5b1c455e0e917832a.jpg'
      },
    
      // MAIN DISHES
      {
        id: 7,
        category: 'Main Dishes',
        name: 'Marrakchi Tajine',
        price: '171',
        description: 'Meatballs with tomato, “Slaoui” zucchini, and fried egg on top.',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/04/67/e0/c6/tajine-de-kefta.jpg'
      },
      {
        id: 8,
        category: 'Main Dishes',
        name: 'Chicken Tajine',
        price: '171',
        description: 'Taliouine saffron, oranges, and black olives.',
        image: 'https://assets.epicurious.com/photos/61f436b55f594e6a062fe09a/1:1/w_4634,h_4634,c_limit/ChickenTagine_RECIPE_012722_26618.jpg'
      },
      {
        id: 9,
        category: 'Main Dishes',
        name: 'Vegetables Tajine',
        price: '171',
        description: 'Potatoes, Slaoui zucchini, white turnips, carrots, and green beans.',
        image: 'https://fitmencook.com/wp-content/uploads/2020/10/moroccan-chicken-tagine-5.jpg'
      },
      {
        id: 10,
        category: 'Main Dishes',
        name: 'Tajine Lamb',
        price: '180',
        description: 'Lamb, caramelized pears, honey, toasted almonds.',
        image: 'https://thetalentzone.co.uk/musictv/wp-content/uploads/2015/06/lamb-tagine.png'
      },
      {
        id: 11,
        category: 'Main Dishes',
        name: 'Sea Bass Fillet',
        price: '225',
        description: 'Sauteed green beans with parsley and delicious chips.',
        image: 'https://cookingmaniac.com/wp-content/uploads/2016/05/pan-seared-seabass01.jpg'
      },
      {
        id: 12,
        category: 'Main Dishes',
        name: 'Fish Tajine',
        price: '225',
        description: 'White cod, prawn tails, diced celery, black olives, fish stock, and Beldi cous cous.',
        image: 'https://images.getrecipekit.com/v1611869928_Moroccan-Style-Fish-Tagine-main_f0qvdy.jpg?aspect_ratio=16:9&quality=90&'
      },
    
      // DESSERTS
      {
        id: 13,
        category: 'Desserts',
        name: 'Italian Ice Cream',
        price: '45',
        description: 'Flavors to choose among cream, chocolate, strawberry.',
        image: 'https://www.thespruceeats.com/thmb/OVvFZ-j3vqeKQDrIzh-NcFbhTt0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-tartufo-480120-hero-01-e8e4ab5007a843fc87a3582309312641.jpg'
      },
      {
        id: 14,
        category: 'Desserts',
        name: 'Pastilla',
        price: '72',
        description: 'Crispy phyllo dough with apples or strawberries, strawberry and yogurt sauce.',
        image: 'https://i.pinimg.com/736x/5f/49/16/5f4916f2311cf51655b4c97959a23580.jpg'
      },
      {
        id: 15,
        category: 'Desserts',
        name: 'Tiramisu',
        price: '81',
        description: 'Tiramisu with Chantilly cream, chocolate, sponge fingers, served with caramelized pears.',
        image: 'https://www.flavoursholidays.co.uk/wp-content/uploads/2020/07/Tiramisu.jpg'
      },
      {
        id: 16,
        category: 'Desserts',
        name: 'Dark chocolate mousse',
        price: '90',
        description: 'Dark chocolate mousse with whipped cream and mint chocolate waffle served with frozen mojito.',
        image: 'https://mediaproxy.salon.com/width/1200/https://media2.salon.com/2024/01/dark_chocolate_mousse_1177622981.jpg'
      },
      {
        id: 17,
        category: 'Desserts',
        name: 'Gourmet Coffee',
        price: '45',
        description: 'Nespresso coffee, chocolate sphere, ice cream.',
        image: 'https://www.elle-et-vire.com/uploads/cache/930w/uploads/recip/recipe/1911/cg-automne.PNG'
      },
      {
        id: 18,
        category: 'Desserts',
        name: 'Moroccan Tea',
        price: '54',
        description: 'Mint Moroccan tea, rum, Moroccan pastries.',
        image: 'https://blog.theteakitchen.com/wp-content/uploads/2021/08/Tea-1.png'
      }
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