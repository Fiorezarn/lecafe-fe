const BASE_API = import.meta.env.VITE_BASE_URL_BE;

const fetchAddCart = async ({ userId, menuId, quantity }) => {
  const response = await fetch(`${BASE_API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userId, menuId, quantity }),
  });
  return await response.json();
};

const fetchGetCartByUserId = async (userId) => {
  const response = await fetch(`${BASE_API}/cart/${userId}`, {
    credentials: "include",
  });

  return await response.json();
};

const fetchDeleteCart = async ({ userId, menuId }) => {
  const response = await fetch(
    `${BASE_API}/cart
    `,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId, menuId }),
    }
  );
  return await response.json();
};

const fetchUpdateQuantity = async ({ id, quantity }) => {
  const response = await fetch(
    `${BASE_API}/cart/${id}
    `,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ quantity }),
    }
  );
  return await response.json();
};

const fetchCountCart = async (userId) => {
  const response = await fetch(`${BASE_API}/cart/count/${userId}`, {
    credentials: "include",
  });

  return await response.json();
};

export {
  fetchAddCart,
  fetchGetCartByUserId,
  fetchDeleteCart,
  fetchUpdateQuantity,
  fetchCountCart,
};
