/*
{"FORMATO PARA CREAR PRODUCTO"
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url que se te ocurra)
}
*/

import express from "express"
import { controlProducto } from "./manejadorProducto/productos.js"

const Prod = new controlProducto();
const app = express();
const port = 8080;
let productos = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get("/api/productos", (req, res)=>{
    const Prods = Prod.get()
    if (!Prods){
        return res.status(404).json({
            error: "Productos no encontrados o cargados",
        });
    }
    res.json(Prods);
});


app.get("/api/productos/:id", (req, res) => {
    const { id } = req.params;
    const productoFiltered = Prod.getById(id)
    if (productoFiltered){
        return res.json(productoFiltered);
    }
    res.status(404).json({
        error: `Producto con: ${id} no encontrado o cargado`,
    })
});


app.post("/api/productos", (req, res) => {
    const producto = req.body;
    if (Prod.add(producto)){
    res.status(201).json(producto);
}
    res.status(400).send();
});

app.delete("/api/productos/:id", (req, res) =>{
    const { id } = req.params;
    Prod.delete(id);
    res.send();
});

const server = app.listen(port, ()=> {
    console.log('Es servidor se conecto al puerto: ' + server.address().port);
});

server.on('error', err => console.log('Error message:' + err));