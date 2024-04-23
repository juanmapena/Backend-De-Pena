import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = req.body;
        const cartId = await cartController.createCart(newCart);
        res.status(201).json({ message: 'Carrito creado exitosamente', cartId });
    } catch (error) {
        console.error('Error al crear carrito:', error);
        res.status(400).json({ error: 'Error al crear carrito' });
    }
});

// Ruta para obtener los productos de un carrito por su ID
router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartController.getCartById(cartId);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener carrito por ID:', error);
        res.status(400).json({ error: 'Error al obtener carrito por ID' });
    }
});

// Ruta para agregar un producto a un carrito por su ID
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = parseInt(req.body.quantity);
        await cartController.addProductToCart(cartId, productId, quantity);
        res.status(200).json({ message: 'Producto agregado al carrito exitosamente' });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(400).json({ error: 'Error al agregar producto al carrito' });
    }
});

export default router;
