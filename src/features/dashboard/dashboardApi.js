const BASE_API = import.meta.env.VITE_BASE_URL_BE;

const fetchCountData = async () => {
  const response = await fetch(`${BASE_API}/dashboard`, {
    credentials: "include",
  });
  return await response.json();
};

export { fetchCountData };
