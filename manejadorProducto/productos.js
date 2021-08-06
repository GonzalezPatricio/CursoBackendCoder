let productos = [];

export class controlProducto {
    constructor(){}
    
    add(producto){
        if (producto.title === "" || typeof producto.title === "undefined") return false;
        producto.id = productos.length + 1;
        productos.push(producto);
        return true
    }

    get(){
        if(productos.length < 1) return false;
        return productos;
    }

    getProductoXid(id){
        return productos.filter((prod)=> prod.id === parseInt(id))[0];
    }
    update(id, producto){
        productos = productos.map(prod => {
                if (prod.id === parseInt(id)) {
                    prod.title = producto.title
                    prod.price = producto.price
                    prod.thumbnail = producto.thumbnail
                }
            return prod
        })
    }
    delete(id) {
        productos = productos.filter((prod)=> prod.id !== parseInt(id));
    }
}
/*exports default = controlProducto;*/