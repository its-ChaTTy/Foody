import React from 'react';
import Navbar from '@/components/Navbar/Navbar';

const orders = [
  {
    orderNumber: 'WU88191111',
    datePlaced: 'Jul 6, 2021',
    totalAmount: '$160.00',
    items: [
      {
        name: 'Micro Backpack',
        description: 'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
        image: 'https://www.riadjnaneimlil.com/uploads/1/2/0/8/120877187/all-moroccan-sallades.jpg',
        price: '$70.00',
        deliveredDate: 'July 12, 2021',
        quantity: 1, // Quantity added
      },
      {
        name: 'Nomad Shopping Tote',
        description: 'This durable shopping tote is perfect for the world traveler. Its yellow canvas construction is water, fray, tear resistant. The matching handle, backpack straps, and shoulder loops provide multiple carry options for a day out on your next adventure.',
        image: 'https://www.riadjnaneimlil.com/uploads/1/2/0/8/120877187/all-moroccan-sallades.jpg',
        price: '$90.00',
        deliveredDate: 'July 12, 2021',
        quantity: 2, // Quantity added
      },
    ],
  },
  {
    orderNumber: 'AT48441546',
    datePlaced: 'Dec 22, 2020',
    totalAmount: '$40.00',
    items: [
      {
        name: 'Double Stack Clothing Bag',
        description: 'Save space and protect your favorite clothes in this double-layer garment bag. Each compartment easily holds multiple pairs of jeans or tops, while keeping your items neatly folded throughout your trip.',
        image: 'https://www.riadjnaneimlil.com/uploads/1/2/0/8/120877187/all-moroccan-sallades.jpg',
        price: '$40.00',
        deliveredDate: 'January 5, 2021',
        quantity: 1, // Quantity added
      },
    ],
  },
];

const OrderHistory = () => {
  return (
    <>
    <Navbar />
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <p className="mb-8 text-gray-700">Check the status of recent orders, manage returns, and discover similar products.</p>
      {orders.map((order) => (
        <div key={order.orderNumber} className="mb-8 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-gray-600">Order number</p>
              <p className="font-medium">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">Date placed</p>
              <p className="font-medium">{order.datePlaced}</p>
            </div>
            <div>
              <p className="text-gray-600">Total amount</p>
              <p className="font-medium">{order.totalAmount}</p>
            </div>
          </div>
          {order.items.map((item, index) => (
            <div key={index} className="flex mb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4 rounded-lg" />
              <div className="flex-grow">
                <h2 className="font-medium text-lg">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-900 font-medium mt-2">{item.price}</p>
                <p className="text-gray-900 mt-2">Quantity: {item.quantity}</p> {/* Quantity displayed */}
                <p className="text-green-600 mt-2">Completed on {item.deliveredDate}</p> {/* Changed to "Completed" */}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
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

export default OrderHistory;