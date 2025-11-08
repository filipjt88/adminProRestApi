// Service API
const BASE = "http://localhost/adminProRestApi/backend/api/users.php";

async function request(url = BASE, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text || res.statusText);
  return text ? JSON.parse(text) : null;
}

// 🔹 GET - svi korisnici
export const getUsers   = () => request(BASE);

// 🔹 GET - jedan korisnik
export const getUser    = (id) => request(`${BASE}?id=${encodeURIComponent(id)}`);

// 🔹 POST - dodaj korisnika
export const createUser = (user) =>
  request(BASE, { method: "POST", body: JSON.stringify(user) });

// 🔹 PUT - izmeni korisnika
export const updateUser = (user) =>
  request(BASE, { method: "PUT", body: JSON.stringify(user) });

// 🔹 DELETE - obriši korisnika
export const deleteUser = (id) =>
  request(BASE, { method: "DELETE", body: JSON.stringify({ id }) });
