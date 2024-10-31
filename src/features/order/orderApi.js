const BASE_URL = import.meta.env.VITE_BASE_URL_BE;

const fetchCreateOrder = async ({
  userId,
  site,
  typeOrder,
  totalPrice,
  menuJson,
}) => {
  const response = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      userId,
      site,
      typeOrder,
      totalPrice,
      menuJson,
    }),
  });
  return await response.json();
};

const fetchAllOrder = async (id) => {
  const response = await fetch(`${BASE_URL}/order/${id}`);
  return await response.json();
};

export { fetchCreateOrder, fetchAllOrder };
