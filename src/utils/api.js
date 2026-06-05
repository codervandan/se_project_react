const baseURL = "http://localhost:3001";

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

export { getItems, addItem, deleteItem };
