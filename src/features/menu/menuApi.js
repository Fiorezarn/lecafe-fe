const BASE_URL = import.meta.env.VITE_BASE_URL_BE;

const fetchAllMenu = async (data) => {
  const { limit, page, search, category } = data;
  let query = "";
  query += limit ? "limit=" + limit + "&" : "";
  query += page ? "page=" + page + "&" : "";
  query += search ? "search=" + search + "&" : "";
  query += category ? "category=" + category + "&" : "";
  const response = await fetch(`${BASE_URL}/menu${query ? "?" + query : ""}`);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
};

const fetchMenuRecommended = async () => {
  const response = await fetch(`${BASE_URL}/menu/recommended`);
  return await response.json();
};

const fetchMenuById = async (id) => {
  const response = await fetch(`${BASE_URL}/menu/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return await response.json();
};

const fetchcreateMenu = async (formData) => {
  const response = await fetch(`${BASE_URL}/menu`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
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
  fetchMenuRecommended,
};
