import { useState, useMemo } from 'react';

const OrderManagement = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            tableNumber: 3,
            orderItems: [{ name: 'Burger', quantity: 2 }, { name: 'Fries', quantity: 1 }],
            totalAmount: 12.99,
            completed: false,
        },
        {
            id: 2,
            tableNumber: 5,
            orderItems: [{ name: 'Pizza', quantity: 1 }, { name: 'Soda', quantity: 2 }],
            totalAmount: 15.50,
            completed: true,
        },
        {
            id: 3,
            tableNumber: 8,
            orderItems: [{ name: 'Salad', quantity: 3 }, { name: 'Water', quantity: 1 }],
            totalAmount: 9.75,
            completed: false,
        },
        {
            id: 4,
            tableNumber: 1,
            orderItems: [{ name: 'Steak', quantity: 1 }, { name: 'Wine', quantity: 2 }],
            totalAmount: 29.99,
            completed: true,
        },
    ]);
    const [filter, setFilter] = useState('All');

    const filteredOrders = useMemo(() => {
        switch (filter) {
            case 'Pending':
                return orders.filter(order => !order.completed);
            case 'Completed':
                return orders.filter(order => order.completed);
            default:
                return orders;
        }
    }, [filter, orders]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const markAsCompleted = (orderId) => {
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                return { ...order, completed: true };
            }
            return order;
        }));
    };

    const cardStyle = `p-6 shadow-lg rounded-lg transition-all duration-300 flex flex-col justify-between`;
    const completedCardStyle = `bg-green-100 ${cardStyle}`;
    const pendingCardStyle = `bg-white ${cardStyle}`;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Management</h1>
            <div className="mb-4 flex gap-4">
                {['All', 'Pending', 'Completed'].map(category => (
                    <button
                        key={category}
                        onClick={() => handleFilterChange(category)}
                        className={`px-4 py-2 rounded ${filter === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-150`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="space-y-6">
                {filteredOrders.map(order => (
                    <div key={order.id} className={order.completed ? completedCardStyle : pendingCardStyle}>
                        <div>
                            <h2 className="text-lg font-bold">Table #{order.tableNumber}</h2>
                            <ul className="list-disc pl-5">
                                {order.orderItems.map((item, index) => (
                                    <li key={index}>{item.name} x{item.quantity}</li>
                                ))}
                            </ul>
                            <p className="font-semibold">Total: ${order.totalAmount.toFixed(2)}</p>
                        </div>
                        {!order.completed && (
                            <button
                                onClick={() => markAsCompleted(order.id)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-150 self-start"
                            >
                                Mark as Completed
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

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

    if (context.req.session.user.role !== 'STAFF') {
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

export default OrderManagement;