import fs from 'fs';

const PRODUCTS_FILE_PATH = './data/productos.json';

const getAllProducts = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const rawData = fs.readFileSync(PRODUCTS_FILE_PATH);
        const products = JSON.parse(rawData);
        const limitedProducts = limit ? products.slice(0, limit) : products;
        res.status(200).json(limitedProducts);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(400).json({ error: 'Error al obtener productos' });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const rawData = fs.readFileSync(PRODUCTS_FILE_PATH);
        const products = JSON.parse(rawData);
        const product = products.find(product => product.id === productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(400).json({ error: 'Error al obtener producto por ID' });
    }
};

const addProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const rawData = fs.readFileSync(PRODUCTS_FILE_PATH);
        const products = JSON.parse(rawData);
        const productId = products.length + 1;
        newProduct.id = productId;
        products.push(newProduct);
        fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2));
        res.status(201).json({ message: 'Producto agregado exitosamente', productId });
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(400).json({ error: 'Error al agregar producto' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProduct = req.body;
        const rawData = fs.readFileSync(PRODUCTS_FILE_PATH);
        let products = JSON.parse(rawData);
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2));
            res.status(200).json({ message: 'Producto actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(400).json({ error: 'Error al actualizar producto' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const rawData = fs.readFileSync(PRODUCTS_FILE_PATH);
        let products = JSON.parse(rawData);
        products = products.filter(product => product.id !== productId);
        fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2));
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(400).json({ error: 'Error al eliminar producto' });
    }
};

export default {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
