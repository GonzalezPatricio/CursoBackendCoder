import express from "express";
import { controlProducto } from "../manejadorProducto/productos";
export default router;

const app = express()
app.use(express.static('public'))
const router = express.Router();
const Prod = new controlProducto();



router.get("/", (rep, res)=>{
    const Prods = Prod.get()
    if (!Prods){
        return res.status(404).json({
            error: "Producto no encontrado o cargado, intenta con otro!!",
        });
    }
    res.json(Prods);
});

router.get("/:id", (req, res)=>{
    const { id } = req.params;
    const productosFiltered = Prod.getProductoXid(id)
    if (productosFiltered){
        return res.json(productosFiltered);
    }
    res.status(404).json({
        error: `Producto con id: ${id} no encontrado o cargado`,
    })
});

router.post("/", (req, res)=>{
    const Prods = Prod.get()
    const producto1 = req.body;
    console.log(req.body);
    if (Prod.add(producto1)){
        res.status(201).json(producto1);
    }
    res.send(producto1)
    return Prods
    // res.send(producto1)
    // res.status(400),send();
});

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    Prod.delete(id);
    res.send();
});

router.put("/:id", (req, res)=>{
    const producto = req.body;
    const { id } = req.params;
    if (Prod.update(id, producto)){
        res.status(201).json(producto);
    }
    res.status(400).send();
});
