const baseURL = process.env.NODE_ENV === "production" ? "https://api.wtwrdaniel.servernux.com" : "http://localhost:3001";

function getItems() {
  return fetch(`${baseURL}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error from weather API: ${res.status}`);
  });
}

function addItem({ name, imageUrl, weather }) {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseURL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error from API: ${res.status}`);
  });
}

function deleteItem(id) {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseURL}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? Promise.resolve() : Promise.reject(`Error from API: ${res.status}`);
  });
}

function addCardLike(id, token) {
  return fetch(`${baseURL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error from API: ${res.status}`);
  });
}

function removeCardLike(id, token) {
  return fetch(`${baseURL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error from API: ${res.status}`);
  });
}

function updateProfile({ name, avatar }) {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseURL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error from API: ${res.status}`);
  });
}

export { getItems, addItem, deleteItem, addCardLike, removeCardLike, updateProfile };
