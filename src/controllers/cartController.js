import fs from 'fs';

const CART_FILE_PATH = './data/carrito.json';

const createCart = async (newCart) => {
    try {
        const rawData = fs.readFileSync(CART_FILE_PATH);
        const carts = JSON.parse(rawData);
        const cartId = generateUniqueId(carts); // Generar un nuevo ID único para el carrito
        newCart.id = cartId;
        carts.push(newCart);
        fs.writeFileSync(CART_FILE_PATH, JSON.stringify(carts, null, 2));
        return cartId;
    } catch (error) {
        throw error;
    }
};

const getCartById = async (cartId) => {
    try {
        const rawData = fs.readFileSync(CART_FILE_PATH);
        const carts = JSON.parse(rawData);
        return carts.find(cart => cart.id === cartId);
    } catch (error) {
        throw error;
    }
};

const addProductToCart = async (cartId, productId, quantity) => {
    try {
        const rawData = fs.readFileSync(CART_FILE_PATH);
        let carts = JSON.parse(rawData);
        const index = carts.findIndex(cart => cart.id === cartId);
        if (index !== -1) {
            const productIndex = carts[index].products.findIndex(item => item.productId === productId);
            if (productIndex !== -1) {
                // Si el producto ya existe en el carrito, incrementar la cantidad
                carts[index].products[productIndex].quantity += quantity;
            } else {
                // Si el producto no existe en el carrito, agregarlo
                carts[index].products.push({ productId, quantity });
            }
            fs.writeFileSync(CART_FILE_PATH, JSON.stringify(carts, null, 2));
        }
    } catch (error) {
        throw error;
    }
};

// Función auxiliar para generar un ID único para el carrito
const generateUniqueId = (carts) => {
    // Encontrar el máximo ID actual en los carritos y agregar 1
    const maxId = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
    return maxId + 1;
};

export default {
    createCart,
    getCartById,
    addProductToCart
};
