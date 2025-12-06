import { apiFetch } from "./api";

export function getSales(preiod = "week"){
    return apiFetch(`/reports/sale?period=${period}`);
}

export function getStockSummary(){
    return apiFetch("/reports/stock-summary");
}