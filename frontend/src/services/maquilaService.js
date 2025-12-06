import { apiFetch } from "./api";

export function getMaquila(){
    return apiFetch("/maquila");
}

export function createMaquilaOrden(data){
    return apiFetch("/maquila", {method: "POST", body: data});
}

export function updateMaquila(id, data){
    return apiFetch(`/maquila/${id}`, { method: "PUT", body: data});
}