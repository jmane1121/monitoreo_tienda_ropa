import { apiFetch } from "./api";

export default function loginService(email, password) {
    return apiFetch("/auth/login", { methos: "POST", body: {email, password}, withAuth: false});
}
export function logoutService(){
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
}