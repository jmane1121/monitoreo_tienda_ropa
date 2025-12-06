const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function getToken(){
    return localStorage.getItem("token");
}

function headers(withAuth = true){
    const h = { "Content-Type": "application/json"};
    if(withAuth){
        const token = getToken();
        if(token) h["Authorization"] = `Bearer ${token}`;
    }
    return h;
}

export async function apiFetch(path, { method = "GET", body = null, withAuth = true} ={}) {
    const res = await fetch(`${API}${path}`,{
        method,
        headers: headers(withAuth),
        body: body ? JSON.stringify(body) : null
    });
    const text = await res.text();
    let data = null;
    try{data = text ? JSON.parse(text) : null; } catch { data = text}

    if(!res.ok){
        const err = data?.error || data || res.statusText;
        const error = new Error(typeof err === "string" ? err : JSON.stringify(err));
        error.status = res.status;
        throw error;
    }
    return data;
}