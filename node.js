/*
{"FORMATO PARA CREAR PRODUCTO"
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url que se te ocurra)
}
*/

import express from "express"
import{ controlProducto } from "./manejadorProducto/productos.js"
import routers  from "./routes/form.js";



const Prod = new controlProducto();
const app = express();
const port = 8080;
const productsRouter = express.Router();
const formRoute = routers;
let productos = [];

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use("/appi/productos", productsRouter);
app.use("/front", formRoute);


productsRouter.get("/", (req, res)=>{
    const Prods = Prod.get()
    if (!Prods){
        return res.status(404).json({
            error: "Productos no encontrados o cargados",
        });
    }
    res.json(Prods);
});


productsRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const productoFiltered = Prod.getProductoXid(id)
    if (productoFiltered){
        return res.json(productoFiltered);
    }
    res.status(404).json({
        error: `Producto con: ${id} no encontrado o cargado`,
    })
});


productsRouter.post("/", (req, res) => {
    const producto = req.body;
    producto.id = productos.length + 1;
    console.log(req.body);
    Prod.add(producto)
    res.status(201).json(producto);
});

productsRouter.delete("/:id", (req, res) =>{
    const { id } = req.params;
    Prod.delete(id);
    res.send();
});

productsRouter.put("/:id", (req, res)=>{
    const producto = req.body;
    const { id } = req.params;
    if (Prod.update(id, producto)){
    res.status(201).json(producto);
    }
    res.status(400).send();
});


const server = app.listen(port, ()=> {
    console.log('Es servidor se conecto al puerto: ' + server.address().port);
});

server.on('error', err => console.log('Error message:' + err));