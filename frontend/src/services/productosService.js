import { apiFetch } from "./api";

export function getProductos(){
    return apiFetch("/productos");
}

export function getProducto(id){
    return apiFetch(`/productos/${id}`);
}

export function createProducto(data){
    return apiFetch("/productos", {method:"POST", body: data});
}

export function updateProducto(id, data){
    return apiFetch(`/productos/${id}`, {method: "PUT", body: data});
}

export function deleteProducto(id){
    return apiFetch(`/productos/${id}`, {method: "DELETE"});
}
