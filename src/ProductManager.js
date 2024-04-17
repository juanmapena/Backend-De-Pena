import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        product.id = this.generateId();
        const products = this.getProducts();
        products.push(product);
        this.saveProducts(products);
        return product.id;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo de productos:', error);
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedFields) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            this.saveProducts(products);
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        let products = this.getProducts();
        products = products.filter(product => product.id !== id);
        this.saveProducts(products);
    }

    saveProducts(products) {
        try {
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
            console.log('Productos guardados correctamente en', this.path);
        } catch (error) {
            console.error('Error al guardar productos:', error);
        }
    }

    generateId() {
        const products = this.getProducts();
        const lastProduct = products[products.length - 1];
        return lastProduct ? lastProduct.id + 1 : 1;
    }
}

//Ejemplos de uso
// Crear una instancia de ProductManager con la ruta del archivo de productos
const productManager = new ProductManager('./productos.json');


// Agregar un producto
const productId = productManager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 10.99,
    thumbnail: 'imagen1.jpg',
    code: 'P001',
    stock: 50
});
console.log('Producto agregado con ID:', productId);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

// Obtener un producto por su ID
const productById = productManager.getProductById(productId);
console.log('Producto con ID', productId, ':', productById);

// Actualizar un producto
const updated = productManager.updateProduct(productId, { price: 15.99 });
if (updated) {
    console.log('Producto actualizado correctamente.');
} else {
    console.log('No se pudo actualizar el producto. Producto no encontrado.');
}

// Eliminar un producto
productManager.deleteProduct(productId);
console.log('Producto eliminado con ID:', productId);

export default ProductManager;
