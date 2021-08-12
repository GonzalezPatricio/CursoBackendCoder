/*
{"FORMATO PARA CREAR PRODUCTO"
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url que se te ocurra)
}
*/
/*
- http://localhost:8080/front (da el formulario para la adhesion de productos)
- 
- http://localhost:8080/appi/productos/vistas (tre los productos agregados)
*/

import express from "express";
import { controlProducto } from "./manejadorProducto/productos.js";
import routers from "./routes/form.js";
import path from 'path';


const app = express();
const port = 8080;
const productsRouter = express.Router();
const formRoute = routers;
let productos = [];
const Prod = new controlProducto();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));


//ACA USAMOS EJS
app.set('views','./views');
app.set('view engine', 'ejs');

app.get('/vista', (req, res) => {
    res.render('inicio.ejs', { productos });
});

app.post('/productos', (req, res) => {
    producto.push(req.body)
    console.log(productos)
    res.redirect('/vista')
});


//ACA USAMOS ROUTER DE EXPRESS
// app.use("/appi/productos", productsRouter);
// app.use("/front", formRoute);

productsRouter.get("/vistas", (req, res)=>{
    let pros = Prod.get()  
    res.render("vista", {
        productos: pros,
        hayProductos: pros.length
    });
    console.log(pros)
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