import express from 'express';
import productsController from '../controllers/productsController.js'; 

const router = express.Router();

// Ruta para listar todos los productos
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productsController.getAllProducts(limit); // Usar la función del controlador para obtener todos los productos
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(400).json({ error: 'Error al obtener productos' });
    }
});

// Ruta para obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsController.getProductById(productId); // Usar la función del controlador para obtener un producto por su ID
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(400).json({ error: 'Error al obtener producto por ID' });
    }
});

// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const productId = await productsController.addProduct(newProduct); // Usar la función del controlador para agregar un nuevo producto
        res.status(201).json({ message: 'Producto agregado exitosamente', productId });
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(400).json({ error: 'Error al agregar producto' });
    }
});

// Ruta para actualizar un producto por su ID
router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProduct = req.body;
        await productsController.updateProduct(productId, updatedProduct); // Usar la función del controlador para actualizar un producto por su ID
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(400).json({ error: 'Error al actualizar producto' });
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        await productsController.deleteProduct(productId); // Usar la función del controlador para eliminar un producto por su ID
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(400).json({ error: 'Error al eliminar producto' });
    }
});

export default router;
