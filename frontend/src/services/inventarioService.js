import { apiFetch } from "./api";

export function getMovimientos(){
    return apiFetch("/movimientos"); 
}

export function createMovimiento(data){
    //data : {tipo, cantidad, productoId, descripcion}
    return apiFetch("/movimientos", {method: "POST", body: data});
}