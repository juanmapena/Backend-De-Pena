import express from 'express';
import config from "./config.js"
import productsRoutes from "./routes/productsRoutes.js";
import cartsRoutes from "./routes/cartsRoutes.js"; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Usa las rutas de los productos
app.use("/api/products", productsRoutes);

// Usa las rutas de los carritos de compra
app.use("/api/carts", cartsRoutes);

app.use('/static', express.static(`${config.DIRNAME}/public`));

app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${config.PORT}`);
    console.log(config.DIRNAME);
});
