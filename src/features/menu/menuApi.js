const BASE_URL = import.meta.env.VITE_BASE_URL_BE;

const fetchAllMenu = async () => {
  const response = await fetch(`${BASE_URL}/menu`);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
};

const fetchMenuById = async (id) => {
  const response = await fetch(`${BASE_URL}/menu/${id}`);
  return await response.json();
};

const fetchcreateMenu = async (formData) => {
  const response = await fetch(`${BASE_URL}/menu`, {
    method: "POST",
    body: formData,
  });
  return await response.json();
};

const fetchEditMenu = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/menu/${id}`, {
    method: "PUT",
    body: formData,
  });
  return await response.json();
};

const fetchDeleteMenu = async (id) => {
  const response = await fetch(`${BASE_URL}/menu/${id}`, {
    method: "PATCH",
  });
  return await response.json();
};

export {
  fetchAllMenu,
  fetchMenuById,
  fetchcreateMenu,
  fetchEditMenu,
  fetchDeleteMenu,
};
