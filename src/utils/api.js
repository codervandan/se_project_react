const baseURL = "http://localhost:3001";

function getItems() {
  return fetch(`${baseURL}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error from weather API: ${res.status}`);
  });
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseURL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error from weather API: ${res.status}`);
  });
}

// TODO - add different parameter (id instead of the object)
// TODO - add different method
// TODO - no body is necessary
// TODO - embed the ID in the URL
function deleteItem(id) {
  return fetch(`${baseURL}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    return res.ok ? Promise.resolve() : Promise.reject(`Error from weather API: ${res.status}`);
  });
}

export { getItems, addItem, deleteItem };
