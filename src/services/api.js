// Service API
const BASE = "http://localhost/adminProRestApi/backend/api/users.php";

async function request(url = BASE, options ={}) {
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json"},
        ...options,
    });
    const text = await res.text();
    if(!res.ok) throw new Error(text || res.statusText);
    return text ? JSON.parse(text) : null;
}

export const getUsers = () => request(BASE + "");
export const getUser = (id) => request(BASE + `?id=${encodeURIComponent(id)}`);
export const createUser = (user) => 
    request(BASE, {method: "POST", body: JSON.stringify(user)});
export const updateUser = (user) => 
    request(BASE, {method: "PUT", body: JSON.stringify(user)});
export const deleteUser = (id) =>
    request(BASE, {method: "DELETE", body: JSON.stringify(id)});