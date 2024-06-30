import { useState } from 'react';
import CartCard from '../../components/CartCard/CartCard';
import Navbar from '../../components/Navbar/Navbar';

function Cart() {
    const [cartItems, setCartItems] = useState([
        {
            id: 'demo1',
            name: 'Demo Item',
            description: 'This is a demo item description.',
            image: 'https://www.riadjnaneimlil.com/uploads/1/2/0/8/120877187/all-moroccan-sallades.jpg',
            quantity: 1,
            price: 9.99,
        },
    ]);
    const [tableNumber, setTableNumber] = useState('');

    const handleRemoveItemFromCart = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const handleChangeQuantity = (id, change) => {
        setCartItems(cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + change } : item
        ));
    };

    return (
        <>
            <Navbar />
            <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{cartItems.length} Items</h2>
                            </div>
                            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                <div className="col-span-12 md:col-span-7">
                                    <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-3">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                {cartItems.map((item) => (
                                    <CartCard
                                        key={item.id}
                                        item={item}
                                        onRemove={handleRemoveItemFromCart}
                                        onQuantityChange={handleChangeQuantity}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                                Order Summary
                            </h2>
                            <div className="mt-8">
                                <div className="flex items-center justify-between pb-6">
                                    <p className="font-normal text-lg leading-8 text-black">{cartItems.length} Items</p>
                                    <p className="font-medium text-lg leading-8 text-black">${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                                </div>
                                <form>
                                    <label className="flex items-center mb-1.5 text-gray-600 text-sm font-medium">Table Number</label>
                                    <div className="flex pb-6">
                                        <div className="relative w-full">
                                            <input
                                                type="number"
                                                placeholder="Table Number"
                                                value={tableNumber}
                                                onChange={(e) => setTableNumber(e.target.value)}
                                                className="block w-full h-11 pr-10 pl-3 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-6 border-y border-gray-200">
                                        <p className="font-normal text-lg leading-8 text-black">You have to pay</p>
                                        <p className="font-bold text-xl leading-8 text-black">${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                                    </div>
                                    <button
                                        className="w-full mt-8 mb-4 py-3 px-6 rounded-full font-semibold text-lg leading-8 text-white shadow-lg shadow-indigo-300 border-none outline-0 transition-all duration-500 hover:bg-opacity-90"
                                        style={{ backgroundColor: '#7c633d' }}>
                                        Proceed to Order
                                    </button>
                                    <button className="w-full flex items-center justify-center py-3 px-6 rounded-full gap-2 font-semibold text-lg leading-8 text-gray-600 shadow-sm shadow-transparent border border-gray-200 outline-0 transition-all duration-500 hover:text-black hover:border-gray-300 hover:shadow-gray-300">
                                        Back to Menu
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getServerSideProps(context) {
    if (!context.req.session || !context.req.session.user) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login",
            },
            props: {},
        };
    }

    if (context.req.session.user.role !== 'CUSTOMER') {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login",
            },
            props: {},
        };
    }

    return {
        props: {
            user: context.req.session.user,
        },
    };
}

export default Cart;
