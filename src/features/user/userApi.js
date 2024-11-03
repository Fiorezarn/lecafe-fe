const BASE_URL = import.meta.env.VITE_BASE_URL_BE;

const fetchAllUser = async () => {
  const response = await fetch(`${BASE_URL}/user`);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export { fetchAllUser };
