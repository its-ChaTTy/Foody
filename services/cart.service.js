import db from '@/lib/prisma';

// Initialize a new order for a user as a cart
export async function initializeCart(userId) {
    return db.order.create({
        data: {
            userId,
            status: 'ACTIVE', // Assuming you use status to track active/inactive orders
            total: 0, // Initialize with 0 total
            tableNumber: 0, // Assuming a default table number or another way to handle this
        }
    });
}

// Fetch the active order for a user, including all order items
export async function fetchCart(userId) {
    return db.order.findFirst({
        where: {
            userId,
            status: 'ACTIVE'
        },
        include: {
            items: true, // Assuming the relation is named 'items' in Order model
        }
    });
}

// Add an item to the user's order
export async function addCartItem(orderId, dishId, quantity) {
    return db.orderItem.create({
        data: {
            orderId,
            dishId,
            quantity,
        }
    });
}

// Update the quantity of an order item
export async function updateCartItem(itemId, quantity) {
    return db.orderItem.update({
        where: {
            id: itemId,
        },
        data: {
            quantity,
        }
    });
}

// Remove an item from the order
export async function deleteCartItem(itemId) {
    return db.orderItem.delete({
        where: {
            id: itemId,
        }
    });
}

// Optional: Clear all items from a user's order (useful for after a checkout process)
export async function clearCart(orderId) {
    return db.orderItem.deleteMany({
        where: {
            orderId,
        }
    });
}